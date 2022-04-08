import DefaultLayout from "../../../components/layouts/DefaultLayout";
import AdminNav from "../../../components/navigation/AdminNav";

const ViewCategories = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className="basis-4/5 py-4 px-3"> View All Categories</div>
      </div>
    </DefaultLayout>
  );
};

export default ViewCategories;
