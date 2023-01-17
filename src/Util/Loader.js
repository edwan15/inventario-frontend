import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className=" flex justify-center  inset-x-60 inset-y-60  absolute md:inset-x-1.5  xl:inset-56 xl:mx-96">
      <Puff
        height="80"
        width="80"
        radius={1}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
