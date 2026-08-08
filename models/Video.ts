import mongoose, { Schema, model, models } from "mongoose";

const video_dimensions = {
  width: 1080,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformations?: {
    width?: number;
    height?: number;
    quality?: number;
  };
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    videoUrl: {
      type: String,
      required: [true, "Please provide a video URL"],
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Please provide a thumbnail URL"],
    },
    controls: {
      type: Boolean,
      default: false,
    },
    transformations: {
      height: {
        type: Number,
        default: video_dimensions.height,
      },
      width: {
        type: Number,
        default: video_dimensions.width,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user ID"],
    },
  },
  {
    timestamps: true,
  },
);

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
