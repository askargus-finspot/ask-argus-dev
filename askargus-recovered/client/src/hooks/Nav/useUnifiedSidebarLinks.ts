import { useMemo, useCallback } from 'react';
import { MessageSquare, SearchCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { NavLink } from '~/common';
import ConversationsSection from '~/components/UnifiedSidebar/ConversationsSection';
import useSideNavLinks from '~/hooks/Nav/useSideNavLinks';

export default function useUnifiedSidebarLinks() {
  const navigate = useNavigate();
  const sideNavLinks = useSideNavLinks({
    includeHidePanel: false,
  });

  const handleInvestigator = useCallback(
    (e?: React.MouseEvent) => {
      e?.preventDefault();
      navigate('/investigator');
    },
    [navigate],
  );

  const links = useMemo(() => {
    const conversationLink: NavLink = {
      title: 'com_ui_chat_history',
      label: '',
      icon: MessageSquare,
      id: 'conversations',
      Component: ConversationsSection,
    };

    const investigatorLink: NavLink = {
      title: 'com_investigator_title',
      label: '',
      icon: SearchCode,
      id: 'investigator',
      onClick: handleInvestigator,
    };

    return [conversationLink, investigatorLink, ...sideNavLinks];
  }, [sideNavLinks, handleInvestigator]);

  return links;
}
