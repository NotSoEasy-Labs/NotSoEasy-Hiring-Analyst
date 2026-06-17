import mongoose, {
  Schema,
} from "mongoose";

export enum ResumeStatus {
  UPLOADED = "UPLOADED",
  PARSING = "PARSING",
  PARSED = "PARSED",
  PROFILE_GENERATED = "PROFILE_GENERATED",
  EVALUATED = "EVALUATED",
  FAILED = "FAILED",
}

const ResumeSchema =
  new Schema(
    {
      campaignId: {
        type: Schema.Types.ObjectId,
        ref: "Campaign",
        required: true,
        index: true,
      },

      uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      originalFileName: {
        type: String,
        required: true,
      },

      storedFileName: {
        type: String,
        required: true,
        unique: true,
      },

      mimeType: {
        type: String,
        required: true,
      },

      fileSize: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: Object.values(
          ResumeStatus
        ),
        default:
          ResumeStatus.UPLOADED,
      },

      sha256: {
        type: String,
        default: null,
        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Resume =
  mongoose.models.Resume ||
  mongoose.model(
    "Resume",
    ResumeSchema
  );