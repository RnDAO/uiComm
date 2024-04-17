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
    const [userPermissions, setUserPermissions] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
      const fetchPermissions = async () => {
        const storedCommunity = StorageService.readLocalStorage<IDiscordModifiedCommunity>('community');
        if (storedCommunity) {
          const userRoles = await getUserCommunityRole(storedCommunity.id);
          if (userRoles) {
            setUserPermissions(userRoles);
          }
        }
      };
      fetchPermissions();

    }, []);

    useEffect(() => {
      if (userPermissions && userPermissions.length > 0) {
        const hasPermission = requiredPermissions.some((permission) =>
          userPermissions.includes(permission)
        );

        if (!hasPermission) {
          router.push('/unauthorized');
        }
      }
    }, [userPermissions]);

    return <Component {...props} />;
  };

  WithRolesWrapper.pageLayout = Component.pageLayout;

  return WithRolesWrapper;
}
