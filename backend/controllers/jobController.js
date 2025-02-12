import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const searchJobs = catchAsyncErrors(async (req, res, next) => {
  const query = req.query.query;
  const jobs = await Job.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
      { location: { $regex: query, $options: 'i' } },
    ],
  });

  res.status(200).json({
    success: true,
    jobs,
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to post jobs.", 400));
  }

  const {
    company,
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    jobType,
    experienceLevel,
    experienceYears,
  } = req.body;

  // Validation checks
  if (
    !company ||
    !title ||
    !description ||
    !category ||
    !country ||
    !city ||
    !location ||
    !jobType ||
    !experienceLevel
  ) {
    return next(new ErrorHandler("Please provide all required job details.", 400));
  }

  // Check for salary input validation
  if ((!salaryFrom && !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please provide either fixed salary or salary range.", 400));
  }

  if (fixedSalary && (salaryFrom || salaryTo)) {
    return next(new ErrorHandler("Cannot provide both fixed and ranged salary.", 400));
  }

  // Create job object
  const jobData = {
    company,
    title,
    description,
    category,
    country,
    city,
    location,
    jobType,
    experienceLevel,
    experienceYears,
    postedBy: req.user._id,
  };

  // Conditional assignment of salary fields based on salary type
  if (fixedSalary) {
    jobData.fixedSalary = fixedSalary;
  } else {
    jobData.salaryFrom = salaryFrom;
    jobData.salaryTo = salaryTo;
  }

  // Create job in database
  const job = await Job.create(jobData);

  res.status(200).json({
    success: true,
    message: "Job posted successfully!",
    job,
  });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to access this resource.", 400));
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to update jobs.", 400));
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Job updated successfully!",
    job,
  });
});

// Delete a job
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seekers are not allowed to delete jobs.", 400));
  }

  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted successfully!",
  });
});

// Get a single job by ID
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
