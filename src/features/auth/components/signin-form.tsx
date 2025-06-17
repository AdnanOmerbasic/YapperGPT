'use client';
import Link from 'next/link';
import { useStateAction } from 'next-safe-action/stateful-hooks';
import { FieldError } from '@/components/form/field-error';
import { Form } from '@/components/form/form';
import { SubmitButton } from '@/components/submit-button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { signUpPath } from '@/utils/paths';
import { signInAction } from '../actions/sign-in';
import { GmailSignIn } from './gmail-signin';

export const SignInForm = () => {
  const { result, execute } = useStateAction(signInAction, {});

  return (
    <div className="container mx-auto flex items-center justify-center pt-24">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={execute} className="flex flex-col space-y-6">
            <div>
              <Label className="pb-1.5" htmlFor="email">
                E-mail
              </Label>
              <Input name="email" defaultValue={result.data?.values?.email} />
            </div>
            <div>
              <Label className="pb-1.5" htmlFor="password">
                Password
              </Label>
              <Input name="password" type="password" />
              <FieldError field="email" result={result} />
              <FieldError field="password" result={result} />
              <div className="mt-2 flex items-center justify-between">
                <Label htmlFor="rememberMe">Remember me?</Label>
                <Checkbox
                  aria-label="Remember me"
                  checked={result.data?.values?.rememberMe}
                  name="rememberMe"
                />
              </div>
            </div>
            <SubmitButton>Sign in</SubmitButton>
            {result.data?.global && (
              <p className="text-sm text-red-500">{result.data.global}</p>
            )}
          </Form>
          <Separator className="my-10" />
          <GmailSignIn />
        </CardContent>
        <CardFooter className="mt-4">
          <div className="w-full">
            <p className="text-muted-foreground mt-2 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link
                href={signUpPath()}
                className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
