import { defaultLayout } from '../layouts/defaultLayout';
import SEO from '../components/global/SEO';
import { useEffect } from 'react';
import SimpleBackdrop from '../components/global/LoadingBackdrop';
import { useRouter } from 'next/router';

function PageIndex(): JSX.Element {
  const route = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('RNDAO_access_token');
    if (!token) {
      location.replace('/login');
    } else {
      route.push('/dashboard');
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
