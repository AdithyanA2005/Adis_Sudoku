import React, { useContext } from "react";
import PropTypes from 'prop-types'
import ColorContext from "../../context/color/ColorContext";
import BoardContext from "../../context/board/BoardContext";

export default function BoardCell({ value, rowIndex, colIndex }) {
  const { secondaryColor, tertiaryColor } = useContext(ColorContext);
  const { focusedCell, setFocusedCell, matchingValueIndices } = useContext(BoardContext);

  // When clicking a cell set it as the currently focusedCell
  const handleOnFocus = () => setFocusedCell({ row: rowIndex, col: colIndex });

  // This function will return appropriate tailwind classes for the cell
  const getCellClasses = () => {
    let classes = [];
    classes.push("grid select-none aspect-square place-items-center outline-none text-3xl sm:text-4xl");

    // The on focus and hover classes
    if (focusedCell.row === rowIndex && focusedCell.col === colIndex) {
      classes.push("ring-[2px] ring-black rounded-sm ring-opacity-50 z-10 opacity-[0.70] ");
    } else {
      if (focusedCell.row === rowIndex || focusedCell.col === colIndex) classes.push("opacity-[0.90]");
      classes.push(" hover:opacity-[0.80]");
    }

    // The classes which seperate the board into 9 squares
    if (colIndex < 6 && (colIndex + 1) % 3 === 0) classes.push("border-r");
    if (rowIndex < 6 && (rowIndex + 1) % 3 === 0) classes.push("border-b");

    // The class for the 1 out of 9 box which contain the cell
    const boxRowStart = focusedCell.row - (focusedCell.row % 3);
    const boxRowEnd = boxRowStart + 2;
    const boxColStart = focusedCell.col - (focusedCell.col % 3);
    const boxColEnd = boxColStart + 2;

    if (boxRowStart <= rowIndex && rowIndex <= boxRowEnd) {
      if (boxColStart <= colIndex && colIndex <= boxColEnd) {
        classes.push("opacity-[0.90]")
      }
    };

    // The classes for cells with same value as focusedCells value
    for (let i = 0; i < matchingValueIndices.length; i++) {
      const position = matchingValueIndices[i];
      if (rowIndex === position[0] && colIndex === position[1]) classes.push("opacity-[0.80]");
    };

    // Return a string with all the classes combined
    return classes.join(" ");
  }

  return (
    <button
      style={{ borderColor: tertiaryColor, backgroundColor: secondaryColor }}
      className={getCellClasses()}
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
