import Link from 'next/link';
import { ThemeSwitcher } from '@/app/_providers/theme-switcher';
import { Button } from '@/components/ui/button';
import { SignOut } from '@/features/auth/components/signout';
import { getAuth } from '@/features/auth/queries/getAuth';
import { homePath, signInPath } from '@/utils/paths';

export const Navbar = async () => {
  const { user } = await getAuth();
  return (
    <header className="bg-background sticky top-4 z-50 mx-auto mt-4 max-w-7xl rounded-full border-2 py-2 shadow-md">
      <div>
        <nav className="flex items-center justify-around px-4">
          <div className="flex pr-2">
            <Link href={homePath()} className="font-semibold">
              yapperGPT
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-8">
            {!user ? (
              <Link href={signInPath()}>
                <Button size="lg">Sign In</Button>
              </Link>
            ) : (
              <SignOut />
            )}
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};
