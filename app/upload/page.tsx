"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Upload,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

import FileUpload from "@/components/FileUpload";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UploadedFile {
  url: string;
  fileId?: string;
  name?: string;
  filePath?: string;
}

export default function UploadPage() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<UploadedFile | null>(null);
  const [thumbnail, setThumbnail] = useState<UploadedFile | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  // -----------------------------
  // Save video metadata
  // -----------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    if (!title.trim()) {
      setError("Please enter a video title.");
      return;
    }

    if (!video) {
      setError("Please upload a video.");
      return;
    }

    if (!thumbnail) {
      setError("Please upload a thumbnail.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/video", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: session?.user.id,
          title: title.trim(),
          description: description.trim(),
          videoUrl: video.url,
          thumbnailUrl: thumbnail.url,
          controls: true,
          transformations: {
            width: 1280,
            height: 720,
            quality: 80,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save video");
      }

      setSuccess(true);

      setTitle("");
      setVideo(null);
      setThumbnail(null);

      setVideoProgress(0);
      setThumbnailProgress(0);

      router.push("/");
    } catch (error) {
      console.error("Save video error:", error);

      setError(
        error instanceof Error ? error.message : "Failed to save video.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to VideoTube
          </Link>

          <h1 className="ml-auto text-lg font-semibold">Upload Video</h1>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Upload a new video</h2>

          <p className="mt-2 text-sm text-slate-400">
            Share your video with the VideoTube community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video and Thumbnail */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Video */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Video className="h-5 w-5 text-blue-500" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Video</h3>

                  <p className="text-xs text-slate-500">MP4, WebM or MOV</p>
                </div>
              </div>

              {video ? (
                <div className="overflow-hidden rounded-xl border border-green-500/20 bg-green-500/5">
                  <div className="flex items-center gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {video.name || "Video uploaded"}
                      </p>

                      <p className="text-xs text-green-400">Upload complete</p>
                    </div>
                  </div>
                </div>
              ) : (
                <FileUpload
                  fileType="video"
                  onSuccess={(response) => {
                    console.log("Video uploaded:", response);

                    setVideo({
                      url: response.url,
                      fileId: response.fileId,
                      name: response.name,
                      filePath: response.filePath,
                    });
                  }}
                  onProgress={setVideoProgress}
                />
              )}

              {videoProgress > 0 && videoProgress < 100 && (
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>Uploading video</span>
                    <span>{videoProgress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${videoProgress}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <ImageIcon className="h-5 w-5 text-purple-400" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">Thumbnail</h3>

                  <p className="text-xs text-slate-500">JPG, PNG or WebP</p>
                </div>
              </div>

              {thumbnail ? (
                <div className="overflow-hidden rounded-xl border border-green-500/20 bg-green-500/5">
                  <div className="flex items-center gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {thumbnail.name || "Thumbnail uploaded"}
                      </p>

                      <p className="text-xs text-green-400">Upload complete</p>
                    </div>
                  </div>
                </div>
              ) : (
                <FileUpload
                  fileType="image"
                  onSuccess={(response) => {
                    console.log("Thumbnail uploaded:", response);

                    setThumbnail({
                      url: response.url,
                      fileId: response.fileId,
                      name: response.name,
                      filePath: response.filePath,
                    });
                  }}
                  onProgress={setThumbnailProgress}
                />
              )}

              {thumbnailProgress > 0 && thumbnailProgress < 100 && (
                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>Uploading thumbnail</span>
                    <span>{thumbnailProgress}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-purple-500 transition-all"
                      style={{
                        width: `${thumbnailProgress}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video Details */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-white"
              >
                Video title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your video title"
                maxLength={150}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="mt-2 text-right text-xs text-slate-500">
                {title.length}/150
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-white"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers what your video is about..."
                maxLength={1000}
                rows={5}
                className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />

              <div className="mt-2 text-right text-xs text-slate-500">
                {description.length}/1000
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {/* Success */}
          {success && (
            <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              Video published successfully!
            </div>
          )}
          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving || !video || !thumbnail || !title.trim()}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Publish Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
