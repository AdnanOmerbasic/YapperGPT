import { Inbox } from 'lucide-react';
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
import { homePath } from '@/utils/paths';

//TODO: Add Conversations to sidebar and remove the items and add settings with dropdown

const items = [
  {
    title: 'Conversation Title',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Conversation Title 2',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Conversation Title 3',
    url: '#',
    icon: Inbox,
  },
];

export function SidebarNav() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="space-y-32">
          <SidebarGroupLabel className="text-lg font-bold">
            <Link href={homePath()}>yapperGPT</Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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
