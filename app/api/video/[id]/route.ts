import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import ConnectDB from "@/lib/db";
import Video from "@/models/Video";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await ConnectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
    }

    const video = await Video.findById(id).populate(
      "userId",
      "name email image",
    );

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json({ video }, { status: 200 });
  } catch (error) {
    console.error("Error fetching video:", error);

    return NextResponse.json(
      { error: "Failed to fetch video" },
      { status: 500 },
    );
  }
}
