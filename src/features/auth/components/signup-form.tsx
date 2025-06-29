'use client';

import Link from 'next/link';
import { useStateAction } from 'next-safe-action/stateful-hooks';
import { useState, useEffect } from 'react';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInPath } from '@/utils/paths';
import { confirmSignUpAction } from '../actions/confirm-sign-up';
import { signUpAction } from '../actions/sign-up';
import { OTPForm } from './otp-form';

export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const { execute: signUpExecute, result: signUpResult } = useStateAction(
    signUpAction,
    {}
  );
  const { execute: confirmExecute, result: confirmResult } = useStateAction(
    confirmSignUpAction.bind(null, email)
  );

  useEffect(() => {
    const returnedEmail = signUpResult.data?.email;
    if (returnedEmail && !signUpResult.validationErrors) {
      setEmail(returnedEmail);
      setShowOtp(true);
    }
  }, [signUpResult.data, signUpResult.validationErrors]);

  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-24">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Sign up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form action={signUpExecute} className="flex flex-col space-y-6">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={signUpResult.data?.email ?? ''}
                />
                <FieldError field="email" result={signUpResult} />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" />
                <FieldError field="password" result={signUpResult} />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                />
                <FieldError field="confirmPassword" result={signUpResult} />
              </div>
              <SubmitButton label="Sign up" />
              <p className="text-muted-foreground text-center text-sm">
                Already have an account?{' '}
                <Link
                  href={signInPath()}
                  className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </Form>
          </CardContent>
        </Card>
      </div>
      <OTPForm
        confirmExecute={confirmExecute}
        confirmResult={confirmResult}
        setShowOtp={setShowOtp}
        isOpen={showOtp}
        email={email}
      />
    </>
  );
};
