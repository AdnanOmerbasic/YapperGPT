'use client';
import { LucideLoaderCircle } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type SubmitButtonProps = {
  label: string;
  className?: string;
};
export const SubmitButton = ({ label, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className={className}>
      {pending ? <LucideLoaderCircle className="animate-spin" /> : label}
    </Button>
  );
};
