import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'Project summary is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  tech: {
    type: [String],
    default: []
  },
  screenshot: {
    type: String,
    default: '/images/default-project.png'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
