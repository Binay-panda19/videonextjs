import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const videos = [
  {
    id: "1",
    title: "Build a Full Stack App with Next.js",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    channel: "CodeWithDev",
    views: "12K views",
    uploadedAt: "2 days ago",
    duration: "18:42",
  },
  {
    id: "2",
    title: "Learn JavaScript in 30 Minutes",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
    channel: "Dev Academy",
    views: "45K views",
    uploadedAt: "5 days ago",
    duration: "30:12",
  },
  {
    id: "3",
    title: "MongoDB Complete Tutorial",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    channel: "Backend Masters",
    views: "8.4K views",
    uploadedAt: "1 week ago",
    duration: "24:36",
  },
  {
    id: "4",
    title: "React vs Next.js: What Should You Learn?",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    channel: "TechTalk",
    views: "21K views",
    uploadedAt: "1 week ago",
    duration: "12:28",
  },
  {
    id: "5",
    title: "Master TypeScript From Scratch",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
    channel: "CodeLab",
    views: "15K views",
    uploadedAt: "2 weeks ago",
    duration: "21:54",
  },
  {
    id: "6",
    title: "How Authentication Works",
    thumbnail:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    channel: "Web Security",
    views: "9.7K views",
    uploadedAt: "2 weeks ago",
    duration: "16:40",
  },
  {
    id: "7",
    title: "Build REST APIs with Node.js",
    thumbnail:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    channel: "NodeSchool",
    views: "32K views",
    uploadedAt: "3 weeks ago",
    duration: "28:17",
  },
  {
    id: "8",
    title: "Git & GitHub for Developers",
    thumbnail:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
    channel: "DevTools",
    views: "54K views",
    uploadedAt: "1 month ago",
    duration: "19:25",
  },
];

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
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold sm:text-3xl">Discover videos</h1>

          <p className="mt-1 text-sm text-slate-400">
            Watch the latest videos from the VideoTube community.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <Link href={`/watch/${video.id}`} key={video.id} className="group">
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-900">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Duration */}
                <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs font-medium text-white">
                  {video.duration}
                </span>

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/30">
                  <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 shadow-xl transition duration-300 group-hover:scale-100 group-hover:opacity-100">
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

              {/* Video Info */}
              <div className="mt-3 flex gap-3">
                {/* Channel Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                  {video.channel.charAt(0)}
                </div>

                <div className="min-w-0">
                  <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-100 transition group-hover:text-blue-400">
                    {video.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">{video.channel}</p>

                  <p className="text-xs text-slate-500">
                    {video.views} • {video.uploadedAt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Upload CTA */}
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
      </div>
    </main>
  );
}
