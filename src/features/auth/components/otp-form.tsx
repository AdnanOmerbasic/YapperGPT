'use client';
import { LucideXCircle } from 'lucide-react';
import { useStateAction } from 'next-safe-action/stateful-hooks';
import { useEffect, useState } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { confirmSignUpAction } from '../actions/confirm-sign-up';

type OTPFormProps = {
  setShowOtp: (show: boolean) => void;
  isOpen: boolean;
  email: string;
};
export const OTPForm = ({ isOpen, setShowOtp, email }: OTPFormProps) => {
  const { execute: confirmExecute, result: confirmResult } = useStateAction(
    confirmSignUpAction.bind(null, email)
  );
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    if (!isOpen) return;
    setTimeLeft(900);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setShowOtp(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleCloseModal}
      />

      <div className="relative z-10 mx-4 w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="relative pb-4 text-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseModal}
              className="absolute right-4">
              <LucideXCircle className="size-5" />
            </Button>

            <h2 className="text-2xl font-semibold">Verify your email</h2>
            <p className="text-muted-foreground mt-2">
              We&apos;ve sent a 6-digit code to {email}
            </p>
          </CardHeader>
          <CardContent>
            <Form
              action={confirmExecute}
              className="flex w-full flex-col items-center justify-center space-y-6">
              <div className="space-y-2">
                <InputOTP maxLength={6} name="otp">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError field="otp" result={confirmResult} />
              </div>
              {timeLeft > 0 && (
                <p className="text-muted-foreground mt-2 text-sm">
                  Code expires in {formatTime(timeLeft)}
                </p>
              )}

              <div className="flex w-full items-center justify-around gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseModal}
                  className="w-36">
                  Go back
                </Button>
                <SubmitButton label="Verify Email" className="w-36" />
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
