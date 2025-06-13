import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getAuth } from '@/features/auth/utils/getAuth';
import { getAllConversationsByTitle } from '@/features/chat/queries/getAllConversationsByTitle';
import { chatPath, homePath } from '@/utils/paths';

export async function SidebarNav() {
  const { session } = await getAuth();
  const conversations = await getAllConversationsByTitle(session!.userId);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-32">
          <SidebarGroupLabel className="text-lg font-bold">
            <Link href={homePath()}>yapperGPT</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conv, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild>
                    <Link href={chatPath(conv.id.toString())}>
                      <span>{conv.title ?? 'New Conversation'}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
