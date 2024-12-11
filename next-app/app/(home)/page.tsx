"use client";

import { categories, videos } from "@/lib/data";
import { CategoryPills } from "@/components/videos/CategoryPills";
import { useEffect, useState } from "react";
import { Video } from "@/lib/types";
import VideoCard from "@/components/videos/VideoCard";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(
    "https://rohith-yt-processed-video.s3.ap-south-1.amazonaws.com/DEMO?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQEIP3KMQDVKRFI5Y%2F20241211%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241211T110843Z&X-Amz-Expires=3600&X-Amz-Signature=c072ba7e2f8dda79dead6fcee74ca3b890e2eb8a0022d4f3af16362af65443ee&X-Amz-SignedHeaders=host"
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch video list from the API
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

  const handlePlayVideo = (videoKey: string) => {
    router.push(`/video/${videoKey}`);
  };

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center pt-24">
        {/* Animate the loader */}
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <main className="pt-16 pl-16 lg:pl-64">
        <div className="max-w-screen-2xl mx-auto p-4">
          <CategoryPills categories={categories} />
          {/*  */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <VideoCard
                key={video.key}
                video={video}
                handlePlayVideo={handlePlayVideo}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
