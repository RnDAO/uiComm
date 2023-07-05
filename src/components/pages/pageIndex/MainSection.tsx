import ActiveMemberComposition from './ActiveMemberComposition';
import HeatmapChart from './HeatmapChart';
// import MemberInteractionGraph from './MemberInteractionGraph';

const MainSection = () => {
  return (
    <div className="block">
      <h3 className="pb-6 text-lg font-medium text-lite-black">
        Community Insights
      </h3>
      <div className="space-y-4">
        <ActiveMemberComposition />
        <HeatmapChart />
        {/* <MemberInteractionGraph /> */}
      </div>
    </div>
  );
};

export default MainSection;
