import React from 'react'

const Footer = () => {

  const year = new Date().getFullYear()

  
  return (
    <div className=" justify-center  text-white font-extrabold   items-center  place-items-end w-full p-3 mt-10  bg-gray-800 ">
      Project Made With Edwan Z - All Rigths Reserved. &copy; {year}
    </div>
  );
}

export default Footer