import Body from "./Elements/Body";
import Footer from "./Elements/Footer";
import Heading from "./Elements/Heading";

const CardItem = ({ title, desc, colorIcon, colorText, status }) => {
  return (
    <>
      <div className={`py-1 rounded-t-md ${colorIcon}`}></div>
      <div className="py-6 px-12 s">
        <div className="flex flex-wrap">
          <div className="flex justify-start w-1/3">
            <Footer colorIcon={colorIcon} status={status} />
          </div>
          <div className="w-2/3 place-content-center">
            <Heading title={title} colorText={colorText} />
            <Body desc={desc} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
