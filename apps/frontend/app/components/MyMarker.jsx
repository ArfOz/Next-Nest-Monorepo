import React from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';

const MyMarker = ({  tooltip, $hover }) => {
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div className={$hover ? "circle hover" : "circle"} onClick={handleClick}>
      <FaMapMarkerAlt color="red" size="25"/>
    </div>
  );
};

export default MyMarker;
