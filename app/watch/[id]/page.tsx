"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  Share2,
  MoreHorizontal,
  User,
  Play,
  Loader2,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import { apiClient } from "../../../lib/api-client";

interface VideoUser {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
}

interface VideoData {
  _id: string;
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
  userId: VideoUser;
  createdAt?: string;
  updatedAt?: string;
}

export default function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [video, setVideo] = useState<VideoData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true);

        const { id } = await params;

        const response = await apiClient.getVideo(id);
        setVideo(response.video);
      } catch (error) {
        console.error("Failed to fetch video:", error);

        setError(
          error instanceof Error ? error.message : "Failed to load video",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm">Loading video...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !video) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <Play className="h-7 w-7 text-red-400" />
            </div>

            <h1 className="mt-5 text-2xl font-bold">Video not found</h1>

            <p className="mt-2 text-sm text-slate-400">
              {error || "This video may have been removed."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to VideoTube
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/"
          className="mb-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to videos
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* ======================= */}
          {/* Main Video */}
          {/* ======================= */}

          <section>
            {/* Video Player */}
            <div className="overflow-hidden rounded-xl bg-black shadow-2xl shadow-black/30">
              <video
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                controls={video.controls ?? true}
                preload="metadata"
                className="aspect-video w-full"
              />
            </div>

            {/* Title */}
            <h1 className="mt-5 text-xl font-bold leading-7 sm:text-2xl">
              {video.title}
            </h1>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              {/* User */}
              <div className="flex items-center gap-3">
                {video.userId?.image ? (
                  <img
                    src={video.userId.image}
                    alt={video.userId.name || "User"}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <User className="h-5 w-5" />
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold">
                    {video.userId?.name || "VideoTube User"}
                  </p>

                  <p className="text-xs text-slate-500">VideoTube creator</p>
                </div>

                <button className="ml-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-200">
                  Subscribe
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700">
                  <ThumbsUp className="h-4 w-4" />
                  Like
                </button>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 transition hover:bg-slate-700">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-5 rounded-xl bg-slate-900 p-5">
              <div className="mb-3 flex items-center gap-3 text-xs text-slate-400">
                {video.createdAt && (
                  <span>
                    {new Date(video.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}

                <span>•</span>

                <span>VideoTube</span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                {video.description}
              </p>
            </div>

            {/* Comments placeholder */}
            <div className="mt-8 border-t border-slate-800 pt-8">
              <h2 className="text-lg font-semibold">Comments</h2>

              <div className="mt-5 rounded-xl border border-dashed border-slate-800 p-8 text-center">
                <p className="text-sm text-slate-500">
                  Comments are coming soon.
                </p>
              </div>
            </div>
          </section>

          {/* ======================= */}
          {/* Sidebar */}
          {/* ======================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <h2 className="mb-4 text-lg font-semibold">More videos</h2>

            <RelatedVideos currentVideoId={video._id} />
          </aside>
        </div>
      </div>
    </main>
  );
}

/* ================================= */
/* Related Videos */
/* ================================= */

function RelatedVideos({ currentVideoId }: { currentVideoId: string }) {
  const [videos, setVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.getVideos();

        const filtered = response.videos
          .filter((video: VideoData) => video._id !== currentVideoId)
          .slice(0, 5);

        setVideos(filtered);
      } catch (error) {
        console.error("Failed to fetch related videos:", error);
      }
    };

    fetchVideos();
  }, [currentVideoId]);

  if (videos.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 text-center">
        <p className="text-sm text-slate-500">No more videos available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <Link
          key={video._id}
          href={`/watch/${video._id}`}
          className="group flex gap-3"
        >
          {/* Thumbnail */}
          <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg bg-slate-900">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
              <Play className="h-6 w-6 scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
            </div>
          </div>

          {/* Info */}
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-200 transition group-hover:text-blue-400">
              {video.title}
            </h3>

            <p className="mt-1 truncate text-xs text-slate-500">
              {video.userId?.name || "VideoTube User"}
            </p>

            <p className="mt-1 text-xs text-slate-600">VideoTube</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
