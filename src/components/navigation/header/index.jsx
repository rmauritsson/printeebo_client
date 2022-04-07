import LowerHeader from "./LowerHeader";
import MainHeader from "./MainHeader";
import TopHeader from "./TopHeader";

const Header = () => {
  return (
    <>
      <div>
        <TopHeader />
        <MainHeader />
        <LowerHeader />
      </div>
      <div className="lg:hidden">Mobile Menu</div>
    </>
  );
};

export default Header;
