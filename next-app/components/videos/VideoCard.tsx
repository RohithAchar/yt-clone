import { Video } from '@/lib/types';
import Image from 'next/image';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded text-xs">
          {video.duration}
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        <Image
          src={video.channel.avatar}
          alt={video.channel.name}
          width={36}
          height={36}
          className="rounded-full h-9 w-9"
        />
        <div>
          <h3 className="font-semibold line-clamp-2">{video.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{video.channel.name}</p>
          <p className="text-sm text-muted-foreground">
            {video.views} views • {video.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}