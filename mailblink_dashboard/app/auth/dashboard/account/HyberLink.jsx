import React from "react";

const HyberLink = (props, e) => {

  return (
    <button className={`underline text-${props.color} text-blue-700 cursor-pointer`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default HyberLink;
