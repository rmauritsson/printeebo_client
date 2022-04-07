import Header from "../../components/navigation/Header";
import CreatorNav from "../../components/navigation/CreatorNav";

const StoreDashboard = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-row mt-4 ">
        <div className="basis-1/5">
          <CreatorNav />
        </div>
        <div className="basis-4/5"> Store Dashboard</div>
      </div>
    </>
  );
};

export default StoreDashboard;
