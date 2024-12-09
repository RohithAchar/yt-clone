'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CategoryPillsProps {
  categories: Category[];
}

export function CategoryPills({ categories }: CategoryPillsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="secondary"
          className={cn(
            'rounded-full whitespace-nowrap',
            selectedCategory === category.id && 'bg-primary text-primary-foreground'
          )}
          onClick={() => setSelectedCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}