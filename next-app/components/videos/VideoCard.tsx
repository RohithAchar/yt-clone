"use client";

import { Video } from "@/lib/types";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";

const VideoCard = ({
  video,
  handlePlayVideo,
}: {
  video: Video;
  handlePlayVideo: (videoKey: string) => void;
}) => {
  // Placeholder thumbnail URL
  const placeholderThumbnailUrl =
    "https://via.placeholder.com/320x180?text=Video+Thumbnail";

  return (
    <Card key={video.key} className="shadow-md">
      <CardHeader>
        <AspectRatio ratio={16 / 9} className="mb-4">
          <img
            src={placeholderThumbnailUrl}
            alt="Placeholder thumbnail"
            className="object-cover w-full h-full rounded"
          />
        </AspectRatio>
        <CardTitle>{video.key}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Size: {(video.size / 1024).toFixed(2)} KB</p>
        <p>Last Modified: {new Date(video.lastModified).toLocaleString()}</p>
        <Button className="mt-4" onClick={() => handlePlayVideo(video.key)}>
          Play
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
