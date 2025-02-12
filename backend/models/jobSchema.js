import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please provide company name."],
    minLength: [3, "Company name must contain at least 3 Characters!"],
    maxLength: [30, "Company name cannot exceed 30 Characters!"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
    index: true, 
  },
  description: {
    type: String,
    required: [true, "Please provide description."],
    minLength: [10, "Description must contain at least 10 Characters!"],
    maxLength: [500, "Description cannot exceed 500 Characters!"],
    index: true, 
  },
  category: {
    type: String,
    required: [true, "Please provide a category."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
    required: [true, "Please provide location."],
    minLength: [3, "Location must contain at least 3 characters!"],
  },
  fixedSalary: {
    type: Number,
    min: [0, "Salary must be at least 0"],
    max: [999999999, "Salary cannot exceed 999,999,999"],
  },
  salaryFrom: {
    type: Number,
    min: [0, "Salary must be at least 0"],
    max: [999999999, "Salary cannot exceed 999,999,999"],
  },
  salaryTo: {
    type: Number,
    min: [0, "Salary must be at least 0"],
    max: [999999999, "Salary cannot exceed 999,999,999"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time"],
    required: [true, "Please specify the type of job."],
  },
  experienceLevel: {
    type: String,
    enum: ["Fresher", "Experienced"],
    required: [true, "Please specify the experience level."],
  },
  experienceYears: {
    type: Number,
    min: [0, "Minimum experience years should be 0."],
    max: [10, "Maximum experience years should be 10."],
    validate: {
      validator: function (v) {
        return this.experienceLevel === "Fresher" ? v === 0 : true;
      },
      message: "Experience years should be 0 for Fresher level.",
    },
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

jobSchema.index({ title: 'text', description: 'text' });

export const Job = mongoose.model("Job", jobSchema);
