'use client';

import Link from 'next/link';
import { useStateAction } from 'next-safe-action/stateful-hooks';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/submit-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInPath } from '@/utils/paths';
import { signUpAction } from '../actions/sign-up';

export const SignUpForm = () => {
  const { execute, result } = useStateAction(signUpAction, {});

  return (
    <div className="container mx-auto flex items-center justify-center pt-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={execute} className="flex flex-col space-y-6">
            <div>
              <Label className="pb-1.5" htmlFor="email">
                E-mail
              </Label>
              <Input name="email" defaultValue={result.data?.values?.email} />
              <FieldError field="email" result={result} />
            </div>
            <div>
              <Label className="pb-1.5" htmlFor="password">
                Password
              </Label>
              <Input name="password" type="password" />
              <FieldError field="password" result={result} />
            </div>
            <div>
              <Label className="pb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input name="confirmPassword" type="password" />
              <FieldError field="confirmPassword" result={result} />
            </div>
            {result.data?.global && (
              <p className="text-sm text-red-500">{result.data.global}</p>
            )}
            <div>
              <p className="text-muted-foreground text-center text-sm">
                Already have an account?{' '}
                <Link
                  href={signInPath()}
                  className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
            <SubmitButton>Sign up</SubmitButton>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
