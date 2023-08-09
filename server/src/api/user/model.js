import { Schema, model } from "mongoose";
import { comparePassword, genHash } from "../../services/bcrypt";
import { sign } from "../../services/jwt";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required. "],
      unique: [true, "Email already exists."],
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
      type: String,
    },
    followers: {
      type: [Schema.Types.ObjectId], // Array of userIds
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId], // Array of userIds
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await genHash(user.password);
  next();
});

UserSchema.methods.validatePassword = async function (password) {
  return await comparePassword(password, this.password);
};

const User = model("User", UserSchema);

export default User;
