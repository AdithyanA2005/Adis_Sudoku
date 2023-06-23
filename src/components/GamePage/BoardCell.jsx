import React, { useContext } from "react";
import PropTypes from 'prop-types'
import ColorContext from "../../context/color/ColorContext";
import BoardContext from "../../context/board/BoardContext";

export default function BoardCell({ value, rowIndex, colIndex }) {
  const { secondaryColor, tertiaryColor } = useContext(ColorContext);
  const { focusedCell, setFocusedCell } = useContext(BoardContext);

  // When clicking a cell set it as the currently focusedCell
  const handleOnFocus = () => setFocusedCell({ row: rowIndex, col: colIndex });

  return (
    <button
      style={{ borderColor: tertiaryColor, backgroundColor: secondaryColor }} disabled={value !== 0}
      className={`grid select-none aspect-square place-items-center outline-none text-3xl sm:text-4xl 
        ${(focusedCell.row === rowIndex && focusedCell.col === colIndex)
          ? "ring-[2px] ring-black rounded-sm ring-opacity-50 z-10 opacity-[0.80]"
          : focusedCell.row === rowIndex
            ? "opacity-[0.90]"
            : focusedCell.col === colIndex
              ? "opacity-[0.90]"
              : " hover:opacity-[0.90]"
        } 
        ${colIndex < 6 && (colIndex + 1) % 3 === 0 && "border-r"} 
        ${rowIndex < 6 && (rowIndex + 1) % 3 === 0 && "border-b"}
      `}
      onFocus={handleOnFocus}
    >
      {value === 0 ? " " : value}
    </button>
  )
}

BoardCell.propTypes = {
  value: PropTypes.number.isRequired,
  colIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
}
