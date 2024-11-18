import React, {
  ComponentType,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

import useAppStore from '../store/useStore';

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
    const userPermissions = useAppStore(
      (state) => state.userRolePermissions || []
    );
    const [isPemissionLoaded, setIsPermissionLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const hasPermission = requiredPermissions.some((permission) =>
        userPermissions.includes(permission)
      );

      if (hasPermission) {
        if (isPemissionLoaded && !hasPermission) {
          router.push('/unauthorized');
        }
        setIsPermissionLoaded(true);
      }
    }, [userPermissions, router, requiredPermissions]);

    return <Component {...props} />;
  };

  WithRolesWrapper.pageLayout = Component.pageLayout;

  return WithRolesWrapper;
}
