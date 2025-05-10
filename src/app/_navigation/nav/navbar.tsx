import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { featuresSection, homePage, signInPage } from '@/lib/paths';

export const Navbar = () => {
  //TODO: Add Theme Switcher

  return (
    <header className="sticky z-50 mx-auto mt-4 max-w-7xl rounded-full border-2 py-2 shadow-md">
      <div>
        <nav className="flex items-center justify-around px-4">
          <div className="flex w-28">
            <Link href={homePage()} className="font-semibold">
              yapperGPT
            </Link>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-10">
            <ul className="cursor-pointer font-semibold">
              <li>
                <Link href={featuresSection()}>Features</Link>
              </li>
            </ul>
            <Link href={signInPage()}>
              <Button className="px-4 sm:px-10">Sign In</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
