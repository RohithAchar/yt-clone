import { categories, videos } from "@/lib/data";
import { CategoryPills } from "@/components/videos/CategoryPills";
import Videos from "@/components/videos/Videos";

export default function Home() {
  return (
    <>
      <main className="pt-16 pl-16 lg:pl-64">
        <div className="max-w-screen-2xl mx-auto p-4">
          <CategoryPills categories={categories} />
          <Videos />
        </div>
      </main>
    </>
  );
}
