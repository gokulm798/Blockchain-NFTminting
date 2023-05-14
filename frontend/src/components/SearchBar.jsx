import React from "react";
import { BiSearch } from "react-icons/bi";
const SearchBar = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (!e.target.value) return setSearchResults(posts);
    const rsltArray = posts.filter(
      (post) =>
        post.title.include(e.target.value) || post.body.includes(e.target.value)
    );
  };
  return (
    <div className="flex bg-white w-52  md:w-65 lg:w-72 rounded-[30px] justify-center items-center">
      <input
        type="text"
        className=" text-black w-[76%] h-6 border-none outline-none bg-white"
      />
      <button
        className="bg-white text-black
         outline-none border-none justify-center pl-2 w-6 "
        onChange={handleSearch}
      >
        <BiSearch />
      </button>
    </div>
  );
};

export default SearchBar;
