import Chart from '../../global/Chart';
// import ActiveMemberComposition from './ActiveMemberComposition';

const MainSection = () => {
  return (
    <div className="block">
      <h3 className="pb-6 text-lg font-medium text-lite-black">
        Community Insights
      </h3>
      <div className="space-y-4">
        {/* <ActiveMemberComposition /> */}
        <Chart />
      </div>
    </div>
  );
};

export default MainSection;
