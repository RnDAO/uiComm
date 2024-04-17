import { useRouter } from 'next/router';
import React, {
  ComponentType,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';

import useAppStore from '../store/useStore';
import { StorageService } from '../services/StorageService';
import { IDiscordModifiedCommunity } from './interfaces';

interface WithRolesProps {
  [key: string]: any;
}
interface IDefaultLayoutProps {
  children: React.ReactNode;
}

interface ComponentWithLayout<P = {}> extends FunctionComponent<P> {
  pageLayout?: ComponentType<IDefaultLayoutProps> | undefined;
}

export function withRoles<P extends WithRolesProps>(
  Component: ComponentWithLayout<P>,
  requiredPermissions: string[]
): ComponentWithLayout<P> {
  const WithRolesWrapper: ComponentWithLayout<P> = (props) => {
    const { getUserCommunityRole } = useAppStore();
    const userPermissions = useAppStore(
      (state) => state.userRolePermissions || []
    );
    const [isPemissionLoaded, setIsPermissionLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const fetchPermissions = async () => {
        const storedCommunity = StorageService.readLocalStorage<IDiscordModifiedCommunity>('community');
        if (storedCommunity) {
          getUserCommunityRole(storedCommunity.id);
          setIsPermissionLoaded(true);
        }
      };
      fetchPermissions();

    }, []);

    useEffect(() => {
      if (isPemissionLoaded) {
        const hasPermission = requiredPermissions.some((permission) =>
          userPermissions.includes(permission)
        );

        if (hasPermission) {
          router.push('/unauthorized');
        }
      }

    }, [isPemissionLoaded, userPermissions]);

    return <Component {...props} />;
  };

  WithRolesWrapper.pageLayout = Component.pageLayout;

  return WithRolesWrapper;
}
