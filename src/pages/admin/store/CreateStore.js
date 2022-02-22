import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";

const CreateStore = () => {
  return (
    <div>
      <Header />
      <h1 className="container mx-auto">Admin Dashboard</h1>
      <div className="container mx-auto flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className="basis-4/5"> Create Store</div>
      </div>
    </div>
  );
};

export default CreateStore;
