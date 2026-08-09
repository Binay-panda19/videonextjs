import { NextRequest, NextResponse } from "next/server";
import ConnectDB from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    await ConnectDB();
    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json({ error: "No videos found" }, { status: 404 });
    }

    return NextResponse.json(videos, { status: 200 });
  } catch (err) {
    console.error("Error fetching videos: " + (err as Error).message);
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: IVideo = await request.json();

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

    const videoData: IVideo = {
      ...body,
      controls: body.controls ?? true,
      transformations: {
        width: 1920,
        height: 1080,
        quality: body.transformations?.quality ?? 100,
      },
    };

    const newVideo = await Video.create({ videoData });

    return NextResponse.json(
      { message: "Video created successfully", video: newVideo },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating video: " + (err as Error).message);
    return NextResponse.json(
      { error: "Error creating video" },
      { status: 500 },
    );
  }
}
