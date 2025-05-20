import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { getAuthOrRedirect } from '@/features/auth/utils/getAuthOrRedirect';
import { SidebarNav } from '../_navigation/nav/sidebar-nav';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getAuthOrRedirect();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarNav />
        <main className="flex flex-1 overflow-y-auto">
          <SidebarTrigger className="fixed" />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
