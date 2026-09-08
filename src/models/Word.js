import mongoose, { mongo } from "mongoose";

const wordSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        example: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Word = mongoose.models.Word || mongoose.model("Word", wordSchema)

export default Word