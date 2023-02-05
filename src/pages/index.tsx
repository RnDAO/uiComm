import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useEffect } from 'react';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { useRouter } from 'next/router';
import { StorageService } from '../services/StorageService';
import { IUser } from '../utils/types';

function PageIndex(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    const user = StorageService.readLocalStorage<IUser>('user');
    if (user) {
      const { token } = user;
      if (!token.accessToken) {
        router.replace('/login');
      } else {
        router.push('/dashboard');
      }
    } else {
      router.replace('/login');
    }
  }, []);
  return (
    <>
      <SEO />
      <SimpleBackdrop />
    </>
  );
}

PageIndex.pageLayout = defaultLayout;

export default PageIndex;
