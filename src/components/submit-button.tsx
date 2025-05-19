'use client';
import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type SubmitButtonProps = {
  children: React.ReactNode;
};
export const SubmitButton = ({ children }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? <LucideLoaderCircle className="animate-spin" /> : children}
    </Button>
  );
};
