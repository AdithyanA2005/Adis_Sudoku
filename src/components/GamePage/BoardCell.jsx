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

    // BORDERS FOR 3x3 BOXES
    if (colIndex < 6 && (colIndex + 1) % 3 === 0) classes.push("border-r");
    if (rowIndex < 6 && (rowIndex + 1) % 3 === 0) classes.push("border-b");

    // HIGHLIGHT CELL WITH SAME VALUE AS THAT OF FOCUSED CELL
    for (let i = 0; i < matchingValueIndices.length; i++) {
      const position = matchingValueIndices[i];
      if (rowIndex === position[0] && colIndex === position[1]) {
        classes.push("opacity-[0.7]");
      }
    };

    // CLASSES FOR THE FOCUSED CELL
    if (focusedCell.row === rowIndex && focusedCell.col === colIndex) {
      classes.push("ring-[2px] ring-black rounded-sm ring-opacity-50 z-10 opacity-[0.7]");
      return classes.join(" ");
    };

    // SHADE THE ROW, COL & BOX OF THE FOCUSED CELL
    // Check if the cell is in the same box in which the focused cell lies
    const boxRowStart = focusedCell.row - (focusedCell.row % 3);
    const boxRowEnd = boxRowStart + 2;
    const boxColStart = focusedCell.col - (focusedCell.col % 3);
    const boxColEnd = boxColStart + 2;
    const isCellIn3By3Box = boxRowStart <= rowIndex && rowIndex <= boxRowEnd && boxColStart <= colIndex && colIndex <= boxColEnd;

    // Check if the cell is in the same col as of the focused cell
    const isCellInSameCol = focusedCell.col === colIndex;

    // Check if the cell is in the same row as of the focused cell
    const isCellInSameRow = focusedCell.row === rowIndex;

    if (isCellIn3By3Box || isCellInSameRow || isCellInSameCol) {
      classes.push("opacity-[0.90]")
    };

    classes.push(" hover:opacity-[0.80]");
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
