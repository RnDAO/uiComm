import { RowOne } from "../components/pages/pageIndex/RowOne";
import { FooterSection } from "../components/pages/pageIndex/FooterSection";
export default function PageIndex(): JSX.Element {
  return (
    <>
      <div className="flex flex-col space-y-12 justify-between px-12 py-4">
        <RowOne />
        <FooterSection />
      </div>
    </>
  );
}
