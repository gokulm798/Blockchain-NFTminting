import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
const SearchBar = ({ handleSearch }) => {
  return (
    <div className="flex bg-white w-52  md:w-65 lg:w-72 rounded-[30px] justify-center items-center">
      <input
        type="text"
        className=" text-black w-[76%] h-6 border-none outline-none bg-white"
        onChange={handleSearch}
      />
      <button
        className="bg-white text-black
         outline-none border-none justify-center pl-2 w-6 "
      >
        <BiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
