import { getAuthOrRedirect } from '@/features/auth/utils/getAuthOrRedirect';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();
  return <main>{children}</main>;
}
