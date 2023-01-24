import { HeaderSection } from "../components/pages/pageIndex/HeaderSection";
import { FooterSection } from "../components/pages/pageIndex/FooterSection";
import MainSection from "../components/pages/pageIndex/MainSection";

import { defaultLayout } from "../layouts/defaultLayout";
import SEO from "../components/global/SEO";
import { useEffect } from "react";
function PageIndex(): JSX.Element {
  useEffect(() => {
    console.log('test');
    
    const token = localStorage.getItem('RNDAO_access_token');
    if (!token) {
      location.replace('/login')
    }
  }, []);
  return (
    <>
      <SEO />
      <div className="flex flex-col container space-y-8 justify-between px-4 md:px-12 py-4">
        <HeaderSection />
        <MainSection />
        <FooterSection />
      </div>
    </>
  );
}

PageIndex.pageLayout = defaultLayout;

export default PageIndex;
