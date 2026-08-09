import mongoose from "mongoose";
import ConnectDB from "../lib/db";

import User from "../models/User";
import Video from "../models/Video";

const sampleVideos = [
  {
    title: "Build a Full Stack App with Next.js",
    description:
      "Learn how to build a complete full stack application using Next.js.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
  },

  {
    title: "Learn JavaScript in 30 Minutes",
    description:
      "A quick introduction to the most important JavaScript concepts.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
  },

  {
    title: "MongoDB Complete Tutorial",
    description: "Learn MongoDB, collections, documents, queries and Mongoose.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  },

  {
    title: "React vs Next.js: What Should You Learn?",
    description: "Understanding the differences between React and Next.js.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
  },

  {
    title: "Master TypeScript From Scratch",
    description:
      "Learn TypeScript fundamentals and start writing safer JavaScript.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
  },

  {
    title: "How Authentication Works",
    description: "Understanding authentication, sessions, JWT and OAuth.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
  },

  {
    title: "Build REST APIs with Node.js",
    description: "Learn how to create REST APIs using Node.js and Express.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
  },

  {
    title: "Git & GitHub for Developers",
    description: "A practical guide to Git and GitHub for developers.",
    videoUrl: "https://ik.imagekit.io/demo/sample-video.mp4",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
  },
];

async function seedVideos() {
  try {
    await ConnectDB();

    console.log("Connected to MongoDB");

    // Find an existing user
    const user = await User.findOne();

    if (!user) {
      throw new Error(
        "No users found. Register a user before running the seed.",
      );
    }

    console.log("Using user:", user._id);

    for (const video of sampleVideos) {
      const exists = await Video.findOne({
        title: video.title,
      });

      if (exists) {
        console.log(`Skipping: ${video.title}`);
        continue;
      }

      await Video.create({
        ...video,

        controls: true,

        transformations: {
          width: 1920,
          height: 1080,
          quality: 100,
        },

        userId: user._id,
      });

      console.log(`Created: ${video.title}`);
    }

    console.log("Video seeding completed.");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedVideos();
