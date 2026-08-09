import connectDB from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    await User.create({ email, password });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error in register route:", err);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
