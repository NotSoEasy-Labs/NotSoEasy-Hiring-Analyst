import mongoose, {
  Schema,
  model,
  models,
} from "mongoose";

export enum UserRole {
  RECRUITER = "RECRUITER",
  CANDIDATE = "CANDIDATE",
  ADMIN = "ADMIN",
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.RECRUITER,
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  models.User ||
  model("User", UserSchema);