import { categories, videos } from '@/lib/data';
import { CategoryPills } from '@/components/videos/CategoryPills';
import { VideoCard } from '@/components/videos/VideoCard';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="pt-16 pl-16 lg:pl-64">
        <div className="max-w-screen-2xl mx-auto p-4">
          <CategoryPills categories={categories} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}