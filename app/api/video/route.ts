import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from "mongoose";

export async function GET() {
  try {
    await ConnectDB();

    const videos = await Video.find()
      .populate("userId", "name email image")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        videos,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error fetching videos:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch videos",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json(
        {
          error: "User ID not found in session.",
        },
        { status: 401 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          error: "Invalid user ID",
        },
        { status: 400 },
      );
    }

    const videoData = {
      title: body.title,
      description: body.description,
      videoUrl: body.videoUrl,
      thumbnailUrl: body.thumbnailUrl,

      controls: body.controls ?? true,

      transformations: {
        width: 1920,
        height: 1080,
        quality: body.transformations?.quality ?? 100,
      },

      userId: new mongoose.Types.ObjectId(userId),
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(
      {
        message: "Video created successfully",
        video: newVideo,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating video:", err);

    return NextResponse.json(
      {
        error: "Error creating video",
      },
      { status: 500 },
    );
  }
}
