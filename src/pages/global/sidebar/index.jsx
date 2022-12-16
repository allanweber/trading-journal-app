import { useAuthState } from '../../../context/UserContext';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileSidebar } from './MobileSidebar';

export const Sidebar = () => {
  const { user } = useAuthState();
  const isMobile = useIsMobile();

  if (!user) return null;

  if (isMobile) {
    return <MobileSidebar />;
  }

  return <DesktopSidebar />;
};
