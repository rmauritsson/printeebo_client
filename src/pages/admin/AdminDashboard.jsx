import DefaultLayout from "../../components/layouts/DefaultLayout";
import AdminNav from "../../components/navigation/AdminNav";

const AdminDashboard = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className={styles.contentWrapper}>
          <div className="flex justify-between items-center mb-4">
            <h5 className={styles.title}>Admin History</h5>
          </div>

          <div className="flow-root"></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const styles = {
  contentWrapper:
    "basis-4/5 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700",
  title: "text-xl font-bold leading-none text-gray-900 dark:text-white",
  unorderedList: "divide-y divide-gray-200 dark:divide-gray-700",
};

export default AdminDashboard;
