"use client"

import { useState } from 'react';

const ToggleButton = () => {

    const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={`flex items-center md:w-14 md:h-[29px] w-[42px] h-6 cursor-pointer rounded-2xl border-2 ${isOn ? "bg-black border-transparent" : "bg-white border-gray-400"}`} onClick={toggleSwitch}>
        <div className={`relative md:left-[3px] md:w-[20px] md:h-[20px] left-[2px] w-[15px] h-[15px]  rounded-full transition-all duration-300 ${isOn ? "bg-gray-100 md:translate-x-6 translate-x-5" : "bg-gray-400 translate-x-0"} `}></div>
    </div>
  )
}

export default ToggleButton