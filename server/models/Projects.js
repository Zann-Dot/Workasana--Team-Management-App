import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });

const Projects = mongoose.model('Project', projectSchema);
export default Projects;