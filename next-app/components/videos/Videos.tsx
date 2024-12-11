"use client";

import { Video } from "@/lib/types";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handlePlayVideo = (videoKey: string) => {
    router.push(`/video/${videoKey}`);
  };
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/videos");
        const data = await res.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center pt-24">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.key}
          video={video}
          handlePlayVideo={handlePlayVideo}
        />
      ))}
    </div>
  );
};

export default Videos;
