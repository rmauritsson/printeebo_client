import Header from "../navigation/header";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container mx-auto px-[2.5rem]">{children}</div>
      <div>{/** Footer */}</div>
    </>
  );
};

export default DefaultLayout;
