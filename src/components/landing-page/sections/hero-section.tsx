import Link from 'next/link';
import { signUpPage } from '@/lib/paths';
import { Button } from '../../ui/button';

export const HeroSection = () => {
  return (
    <section className="h-full w-full px-4 py-28 md:px-10">
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-12 pt-12 lg:flex-row lg:space-x-10">
        <div className="max-w-lg">
          <h1 className="text-5xl leading-tight font-bold">YapperGPT</h1>
          <p className="text-muted-foreground mt-6 text-xl">
            Your AI-powered assistant for all your needs. Get instant answers,
            creative content, and helpful solutions with our advanced language
            model.
          </p>
          <Link href={signUpPage()}>
            <Button size="lg" className="mt-6 px-8 py-4 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="hidden lg:block">
          <img
            src="img/chat-preview.png"
            alt="YapperGPT chat preview"
            className="h-96 rotate-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-12"
          />
        </div>
      </div>
    </section>
  );
};
