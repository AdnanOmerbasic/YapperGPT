import Link from 'next/link';
import { ThemeSwitcher } from '@/app/_providers/theme-switcher';
import { Button } from '@/components/ui/button';
import { featuresSection, homePage, signInPage } from '@/lib/paths';

export const Navbar = () => {
  return (
    <header className="sticky z-50 mx-auto mt-4 max-w-7xl rounded-full border-2 py-2 shadow-md">
      <div>
        <nav className="flex items-center justify-around px-4">
          <div className="flex pr-2">
            <Link href={homePage()} className="font-semibold">
              yapperGPT
            </Link>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-8">
            <ul className="cursor-pointer font-semibold">
              <li>
                <Link href={featuresSection()}>Features</Link>
              </li>
            </ul>
            <Link href={signInPage()}>
              <Button className="px-4 sm:px-12">Sign In</Button>
            </Link>
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};
