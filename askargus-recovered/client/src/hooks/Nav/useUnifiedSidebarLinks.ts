import { useMemo } from 'react';
import { MessageSquare } from 'lucide-react';
import type { NavLink } from '~/common';
import ConversationsSection from '~/components/UnifiedSidebar/ConversationsSection';
import useSideNavLinks from '~/hooks/Nav/useSideNavLinks';

export default function useUnifiedSidebarLinks() {
  const sideNavLinks = useSideNavLinks({
    includeHidePanel: false,
  });

  const links = useMemo(() => {
    const conversationLink: NavLink = {
      title: 'com_ui_chat_history',
      label: '',
      icon: MessageSquare,
      id: 'conversations',
      Component: ConversationsSection,
    };

    return [conversationLink, ...sideNavLinks];
  }, [sideNavLinks]);

  return links;
}
