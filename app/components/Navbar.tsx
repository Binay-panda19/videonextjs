"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20">
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>

          <span className="text-xl font-bold tracking-tight text-white">
            Video<span className="text-blue-500">Tube</span>
          </span>
        </Link>

        {/* Search */}
        <div className="mx-auto hidden w-full max-w-xl sm:block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Search:", search);
            }}
            className="flex"
          >
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-l-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="rounded-r-lg border border-l-0 border-slate-700 bg-slate-800 px-5 text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Upload */}
          <Link
            href="/upload"
            className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 sm:flex"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0L7 9m5-5 5 5M5 20h14"
              />
            </svg>
            Upload
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Sign in
          </Link>

          {/* Mobile Menu */}
          <button
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 sm:hidden"
            aria-label="Menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-slate-800 px-4 py-3 sm:hidden">
        <form className="flex">
          <input
            type="text"
            placeholder="Search videos..."
            className="w-full rounded-l-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

          <button
            type="submit"
            className="rounded-r-lg bg-slate-800 px-4 text-slate-300"
          >
            🔍
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
