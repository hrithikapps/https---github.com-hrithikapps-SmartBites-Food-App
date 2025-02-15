import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <div className=" fixed left-0 bottom-0 flex  justify-center align-middle w-full  bg-slate-200 ">
      <div className=" flex justify-center content-center p-3 align-middle text-gray-600">
        Made with
        <AiFillHeart className="text-red-700 m-1" />
        by Kumar Hrithik
      </div>
    </div>
  );
};
export default Footer;
