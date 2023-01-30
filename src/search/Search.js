import React from 'react'
import {GoSearch} from "react-icons/go"

const Search = ({value , onChange}) => {

  return (
    <div className="border-2 border-blue-300 rounded-md p-2 justify-end items-end max-w-xs  lg:max-w-2xl bg-white ">
      
      <div className="flex gap-2">
        <GoSearch  className='text xl mt-1'/>
        <input
          type="text"
          placeholder=" Search products ....."
          value={value}
          onChange={onChange}
          className="w-full outline-none"
        />
      </div>
    </div>
  );
}

export default Search