import { useMemo } from 'react';
import { MCPIcon } from '@askargus/client';
import { ArrowRightToLine } from 'lucide-react';
import {
  Permissions,
  PermissionTypes,
} from 'askargus-data-provider';
import type { NavLink } from '~/common';
import MCPBuilderPanel from '~/components/SidePanel/MCPBuilder/MCPBuilderPanel';
import { useHasAccess, useMCPServerManager } from '~/hooks';

export default function useSideNavLinks({
  hidePanel,
  includeHidePanel = true,
}: {
  hidePanel?: () => void;
  includeHidePanel?: boolean;
}) {
  const hasAccessToUseMCPSettings = useHasAccess({
    permissionType: PermissionTypes.MCP_SERVERS,
    permission: Permissions.USE,
  });
  const hasAccessToCreateMCP = useHasAccess({
    permissionType: PermissionTypes.MCP_SERVERS,
    permission: Permissions.CREATE,
  });
  const { availableMCPServers } = useMCPServerManager();

  const Links = useMemo(() => {
    const links: NavLink[] = [];
    
    // All sidebar panels have been removed:
    // - Agent Builder (removed)
    // - Prompts (removed)
    // - Memory (removed)
    // - Parameters (removed)
    // - Attachments/Files (removed)
    // - Bookmarks (removed)
    // - MCP Builder (kept for admin purposes)

    if (
      (hasAccessToUseMCPSettings && availableMCPServers && availableMCPServers.length > 0) ||
      hasAccessToCreateMCP
    ) {
      links.push({
        title: 'com_nav_setting_mcp',
        label: '',
        icon: MCPIcon,
        id: 'mcp-builder',
        Component: MCPBuilderPanel,
      });
    }

    if (includeHidePanel && hidePanel) {
      links.push({
        title: 'com_sidepanel_hide_panel',
        label: '',
        icon: ArrowRightToLine,
        onClick: hidePanel,
        id: 'hide-panel',
      });
    }

    return links;
  }, [
    availableMCPServers,
    hasAccessToUseMCPSettings,
    hasAccessToCreateMCP,
    includeHidePanel,
    hidePanel,
  ]);

  return Links;
}
