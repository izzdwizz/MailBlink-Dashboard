"use client";

import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { IoCheckbox } from "react-icons/io5";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { webNotifications } from "./data";
import { mailNotifications } from "./data";

const page = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = (id) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id] || false,
    }));
  };

  return (
    <main>
      <div className="md:p-20 px-12 py-20 md:w-[65%] w-[100%] m-auto border border-red-500">
        <h2 className="font-bold text-3xl">Notification</h2>

        {/* emailnotifications */}
        <div className="mt-10 ">
        <h3 className="font-bold text-xl">Email notification</h3>
        {mailNotifications.map((item) => (
            <div key={item.title} className="flex items-center justify-between mt-6">
            <div className="w-[80%]">
               <h4 className="font-bold text-base mb-3">{item.title}</h4>
               <p>{item.label}</p>
             </div>
             <ToggleButton/>
           </div>
        ))}
        </div>

        {/* Website notification */}
        <div className="mt-14">
        <h3 className="font-bold text-xl">Website notification</h3>
        {webNotifications.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer items-center gap-2 mt-3"
            onClick={() => toggleCheckbox(item.id)}>
            {isChecked[item.id] ? (
              <IoCheckbox size={20} className="text-black" />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={20} className="text-gray-400" />
            )}
            <span className="">{item.label}</span>
          </div>
        ))}
        </div>
       
        <div>
          <button>Save Changes</button>
          <button>cancel</button>
        </div>
      </div>
    </main>
  );
};

export default page;
