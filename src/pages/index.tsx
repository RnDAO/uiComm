import { RowOne } from "../components/pages/pageIndex/RowOne";
import { FooterSection } from "../components/pages/pageIndex/FooterSection";
import MainSection from "../components/pages/pageIndex/MainSection";

import { defaultLayout } from "../layouts/defaultLayout";
function PageIndex(): JSX.Element {
  return (
    <>
      <div className="flex flex-col space-y-8 justify-between px-12 py-4">
        <RowOne />
        <MainSection />
        <FooterSection />
      </div>
    </>
  );
}

PageIndex.pageLayout = defaultLayout;

export default PageIndex;
