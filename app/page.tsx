"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import Navbar from "@/components/Navbar";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Programming",
  "Technology",
  "Education",
  "Podcasts",
  "News",
];

export default function HomePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await apiClient.getVideos();

        setVideos(response.videos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);

        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                index === 0
                  ? "bg-white text-slate-950"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Discover videos</h1>

          <p className="mt-1 text-sm text-slate-400">
            Watch the latest videos from the VideoTube community.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-video rounded-xl bg-slate-900" />

                <div className="mt-3 h-4 rounded bg-slate-900" />

                <div className="mt-2 h-3 w-2/3 rounded bg-slate-900" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-400">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && videos.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center">
            <h2 className="text-xl font-semibold">No videos yet</h2>

            <p className="mt-2 text-sm text-slate-400">
              Be the first person to upload a video.
            </p>

            <Link
              href="/upload"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500"
            >
              Upload a video
            </Link>
          </div>
        )}

        {/* Videos */}
        {!loading && !error && videos.length > 0 && (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <Link
                href={`/watch/${video._id}`}
                key={video._id}
                className="group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />

                  {/* Play */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                    <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-blue-600 opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                      <svg
                        className="ml-1 h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7L8 5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-3 flex gap-3">
                  {/* Avatar */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                    {video.userId?.name?.charAt(0) || "U"}
                  </div>

                  <div className="min-w-0">
                    <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-100 transition group-hover:text-blue-400">
                      {video.title}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      {video.userId?.name || "VideoTube User"}
                    </p>

                    <p className="text-xs text-slate-500">
                      VideoTube •{" "}
                      {new Date(video.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Upload CTA */}
        {!loading && (
          <section className="my-16 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10">
              <svg
                className="h-7 w-7 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-xl font-bold">Share your videos</h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              Upload your videos and share your content with the VideoTube
              community.
            </p>

            <Link
              href="/upload"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Upload a video
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
