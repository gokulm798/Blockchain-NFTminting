import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import ConnButton from "./ConnButton";

const Navbar = (props) => {
  const [MenuBtn, setMenuBtn] = useState(false);
  const { items, handleItemClick, handleConnect } = props;
  return (
    <div className="max-w-[1640] mx-auto flex justify-between items-center p-4 bg-black/50 text-white">
      {/*Left */}
      <div className="flex items-center  ">
        <div className="cursor-pointer">
          <AiOutlineMenu size={30} onClick={() => setMenuBtn(!MenuBtn)} />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl px-2">
            <span>MediChain</span>
          </h1>
        </div>
      </div>
      {/* overlay */}
      {MenuBtn ? (
        <div className=" bg-primary/60 fixed top-0 left-0 w-full h-screen z-20 duration-700"></div>
      ) : (
        ""
      )}
      {/* sidedrawer */}
      <div
        className={
          MenuBtn
            ? "fixed bg-primary/100 w-[300px] h-screen top-0 left-0 z-20 duration-700"
            : "fixed bg-primary w-[300px] h-screen top-0 left-[-100%] z-20 duration-[1.7s]"
        }
      >
        <h2 className="text-white text-2xl ml-6 mt-3">Dashboard</h2>
        <AiOutlineClose
          size={20}
          className="absolute m-2 cursor-pointer top-3 right-3 text-white"
          onClick={() => setMenuBtn(!MenuBtn)}
        />
        <nav>
          <SideMenuList items={items} handleItemClick={handleItemClick} />
        </nav>
      </div>
      <div className="text-white">
        <ConnButton handleConnect={handleConnect} />
      </div>
    </div>
  );
};

const SideMenuList = (props) => {
  const { items, handleItemClick } = props;

  return (
    <ul className="mt-8">
      {items.map((item, index) => (
        <ListItems key={index} text={item} handleItemClick={handleItemClick} />
      ))}
    </ul>
  );
};

const ListItems = (props) => {
  const { text, handleItemClick } = props;
  return (
    <>
      <li
        className="my-4  mx-2 text-2xl cursor-pointer rounded-[30px] pl-8 hover:bg-white/20 duration-100"
        onClick={() => handleItemClick(text)}
      >
        {text}
      </li>
    </>
  );
};
export { Navbar, SideMenuList, ListItems };
