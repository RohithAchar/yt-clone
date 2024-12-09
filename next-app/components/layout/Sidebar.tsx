import { Home, Compass, Clock, ThumbsUp, PlaySquare, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 w-16 lg:w-64 h-[calc(100vh-4rem)] bg-background border-r p-2">
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="justify-start gap-4">
          <Home className="h-5 w-5" />
          <span className="hidden lg:inline">Home</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <Compass className="h-5 w-5" />
          <span className="hidden lg:inline">Explore</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <History className="h-5 w-5" />
          <span className="hidden lg:inline">History</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <PlaySquare className="h-5 w-5" />
          <span className="hidden lg:inline">Library</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <Clock className="h-5 w-5" />
          <span className="hidden lg:inline">Watch Later</span>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <ThumbsUp className="h-5 w-5" />
          <span className="hidden lg:inline">Liked Videos</span>
        </Button>
      </div>
    </aside>
  );
}