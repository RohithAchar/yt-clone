'use client';

import { Menu, Search, Bell, User, Video, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background z-50 border-b">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-1">
            <Video className="h-6 w-6 text-red-600" />
            <span className="font-semibold text-lg">YouTube</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center">
              <Input
                placeholder="Search"
                className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-l-none px-6 bg-secondary hover:bg-secondary/80">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mic className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}