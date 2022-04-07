import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SiderBarLayout = ({ menu }) => {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          {menu?.map((menuItem) =>
            menuItem.size > 0 ? (
              <li key={menuItem.title}>
                <NavLink to={menuItem.link} className={styles.navlink}>
                  {menuItem.icon}
                  <span className={styles.title}>{menuItem.title}</span>
                  <span className={styles.menusize}>{menuItem.size}</span>
                </NavLink>
              </li>
            ) : (
              <li key={menuItem.title}>
                <NavLink to={menuItem.link} className={styles.navlink}>
                  {menuItem.icon}
                  <span className={styles.title}>{menuItem.title}</span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      </div>
    </aside>
  );
};

const styles = {
  title: "flex-1 ml-3 whitespace-nowrap",
  navlink:
    "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
  menusize:
    "inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200",
};

export default SiderBarLayout;
