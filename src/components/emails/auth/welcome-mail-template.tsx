import {
  Html,
  Body,
  Tailwind,
  Container,
  Head,
  Section,
  Text,
  Hr,
} from '@react-email/components';

interface WelcomeMailTemplateProps {
  toEmail: string;
  code: string;
}
export default function WelcomeMailTemplate({
  toEmail,
  code,
}: WelcomeMailTemplateProps) {
  return (
    <Html>
      <Tailwind>
        <Head>
          <title>Welcome to YapperGPT</title>
        </Head>
        <Body className="bg-gray-100 text-gray-900">
          <Container className="mx-auto mt-10 mb-10 max-w-lg overflow-hidden rounded-lg bg-white shadow-md">
            <Section className="p-6 text-center">
              <Text className="mx-auto mb-4">yapperGPT</Text>
              <Text className="text-2xl font-bold text-gray-900">
                Welcome {toEmail} to YapperGPT!
              </Text>
              <Text className="mt-2 text-gray-600">
                We&apos;re excited to have you on board. YapperGPT helps you
                chat with AI smarter and more efficiently.
              </Text>
            </Section>

            <Hr className="my-4 border-gray-200" />

            <Section className="px-6 pb-6 text-center">
              <Text className="mb-2 text-gray-800">
                Please verify your email address to get started. The code below
                is valid for 15 minutes.
              </Text>
              <Text className="bg-black p-10 text-xl text-white">{code}</Text>
              <Text className="mt-6 text-sm text-gray-500">
                If you didn’t sign up for YapperGPT, you can safely ignore this
                email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

WelcomeMailTemplate.PreviewProps = {
  toEmail: 'john.doe@gmail.com',
};
