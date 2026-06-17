import mongoose, {
  Schema,
} from "mongoose";

const CampaignSchema =
  new Schema(
    {
      ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",

        // NOT required yet
        default: null,

        index: true,
      },

      title: {
        type: String,
        required: true,
      },

      jobDescription: {
        type: String,
        required: true,
      },

      recruiterNotes: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "DRAFT",
          "FRAMEWORK_GENERATED",
          "CLARIFICATION_PENDING",
          "READY_FOR_EVALUATION",
        ],
        default: "DRAFT",
      },

      framework: {
        type: Object,
        default: null,
      },

      clarificationQuestions: {
        type: Array,
        default: [],
      },

      clarificationAnswers: {
        type: Object,
        default: {},
      },

      refinedFramework: {
        type: Object,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

export const Campaign =
  mongoose.models.Campaign ||
  mongoose.model(
    "Campaign",
    CampaignSchema
  );