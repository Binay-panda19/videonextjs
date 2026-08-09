"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User, Upload, LogOut, LogIn, Search, Video } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!search.trim()) return;

    console.log("Searching for:", search);

    // Later you can navigate to:
    // router.push(`/search?q=${search}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* ==================== */}
        {/* Logo */}
        {/* ==================== */}

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/20">
            <Video className="h-5 w-5 text-white" />
          </div>

          <span className="hidden text-xl font-bold tracking-tight text-white sm:block">
            Video<span className="text-blue-500">Tube</span>
          </span>
        </Link>

        {/* ==================== */}
        {/* Home */}
        {/* ==================== */}

        <Link
          href="/"
          className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white md:flex"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        {/* ==================== */}
        {/* Search */}
        {/* ==================== */}

        <form onSubmit={handleSearch} className="mx-auto flex w-full max-w-xl">
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-l-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="flex items-center justify-center rounded-r-lg border border-l-0 border-slate-700 bg-slate-800 px-4 text-slate-300 transition hover:bg-slate-700 hover:text-white"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* ==================== */}
        {/* Right Side */}
        {/* ==================== */}

        <div className="flex shrink-0 items-center gap-2">
          {/* Upload */}
          <Link
            href="/upload"
            className="hidden items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 sm:flex"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Link>

          {/* Loading Session */}
          {status === "loading" && (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-slate-800" />
          )}

          {/* ==================== */}
          {/* Logged In */}
          {/* ==================== */}

          {status === "authenticated" && session?.user && (
            <div className="flex items-center gap-2">
              {/* User Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-slate-800"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}

                <div className="hidden max-w-32 md:block">
                  <p className="truncate text-sm font-medium text-white">
                    {session.user.name || "User"}
                  </p>

                  {session.user.email && (
                    <p className="truncate text-xs text-slate-500">
                      {session.user.email}
                    </p>
                  )}
                </div>
              </Link>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="flex items-center justify-center rounded-lg p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* ==================== */}
          {/* Logged Out */}
          {/* ==================== */}

          {status === "unauthenticated" && (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign in</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
