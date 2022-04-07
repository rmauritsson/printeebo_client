import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";

const ViewProducts = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-blue-500">Admin Dashboard</h1>
        <div className="flex flex-row mt-4 ">
          <div className="basis-1/5">
            <AdminNav />
          </div>
          <div className="basis-4/5"> View All Products</div>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
