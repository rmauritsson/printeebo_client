import Header from "../../components/navigation/Header";
import UserNav from "../../components/navigation/UserNav";

const UserHistory = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-row mt-4 ">
        <div className="basis-1/5">
          <UserNav />
        </div>
        <div className="basis-4/5"> User History</div>
      </div>
    </>
  );
};

export default UserHistory;
