'use client';
import { LucideMoon, LucideSun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';

export const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={checked => setTheme(checked ? 'dark' : 'light')}
      />
      <span>
        {theme === 'dark' ? (
          <LucideMoon className="size-4" />
        ) : (
          <LucideSun className="size-4" />
        )}
      </span>
    </div>
  );
};
