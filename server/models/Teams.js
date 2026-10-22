import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: { type: String },
}, { timestamps: true });
const Teams = mongoose.model("Team", teamSchema);
export default Teams;
