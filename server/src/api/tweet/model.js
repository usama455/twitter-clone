import { Schema, model } from "mongoose";

const TweetSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to the User model
            required: true,
        },
        retweets: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // Reference to the User model
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Tweet = model("Tweet", TweetSchema);

export default Tweet;