import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        status:{
            type:Boolean,
            default:false
        },
        isDelete:{
            type:Boolean,
            default:false

        },
    },
    
    {
        timestamps: true,
    }
);

const postModel = model("Post", postSchema);
export default postModel