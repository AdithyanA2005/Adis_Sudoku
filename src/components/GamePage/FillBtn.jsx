import React, { useContext } from "react";
import PropTypes from "prop-types";
import ColorContext from "../../context/color/ColorContext";

export default function FillBtn({ value, count }) {
  const { primaryColor } = useContext(ColorContext);

  return (
    <div 
      style={{ backgroundColor: primaryColor }}
      className="aspect-square rounded-xl flex flex-col items-center justify-center"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl" >
        {value}
      </h2>

      <h3 className="text-md -mt-1.5 sm:-mt-1 font-medium">
        {count}
      </h3>
    </div>
  )
}

FillBtn.propTypes = {
  value: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}