// Returns a random tailwind color
export function getRandomColor() {
  // Array containing a list of tailwind colors
  const colorArr = [
    "rgb(252 165 165)", // red-300
    "rgb(94 234 212)", // teal-300
    "rgb(103 232 249)", // cyan-300
    "rgb(147 197 253)", // blue-300
    "rgb(249 168 212)", // pink-300
    "rgb(253 164 175)", // rose-300
    "rgb(134 239 172)", // green-300
    "rgb(252 211 77)", // amber-300
    "rgb(253 186 116)", // orange-300
    "rgb(253 224 71)", // tellow-300
    "rgb(165 180 252)", // indigo-300
    "rgb(216 186 254)", // purple-300
  ];

  // Randomly selecting a color from the colors array
  const arrLen = colorArr.length;
  const randomArrIndex = Math.floor(Math.random() * arrLen);
  return colorArr[randomArrIndex];
};
