"use client";

import { Video } from "@/lib/types";

export const VideoCard = ({
  video,
  handlePlayVideo,
}: {
  video: Video;
  handlePlayVideo: (videoKey: string) => void;
}) => {
  return (
    <div
      className="cursor-pointer group"
      onClick={() => handlePlayVideo(video.key)}
    >
      {/* Thumbnail Container */}
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            alt={video.key}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
          {Math.floor(Math.random() * 10) + 1}:
          {Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-3 flex gap-3">
        {/* Title and Meta Container */}
        <div className="flex flex-col">
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 group-hover:text-blue-600">
            {video.key}
          </h3>
          <div className="text-sm text-gray-600 mt-1">
            {(video.size / 1024 / 1024).toFixed(1)}M views •{" "}
            {new Date(video.lastModified).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
