"use client";

import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VideoPage() {
  const { key } = useParams();
  const [src, setSrc] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchVideo = async () => {
        const res = await fetch(`http://localhost:3000/api/videos/${key}`);
        const data = await res.json();
        setSrc(data.url);
      };
      fetchVideo();
    } catch (error) {
      alert("Something went wrong");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center pt-24">
        <Loader className="animate-spin" />
      </div>
    );
  }

  if (!src) {
    return null;
  }
  return (
    <div className="pt-16 pl-16 lg:pl-64">
      <div className="aspect-video w-full max-w-4xl">
        <video controls autoPlay className="w-full h-full">
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="text-2xl font-semibold mb-4">{params.key}</h1>
      </div>
    </div>
  );
}
