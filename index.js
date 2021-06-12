const grid = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "#", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "#", "#"],

  ["#", "#", "#", "+", "#", "+", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "+", "#", "#", "#"],

  ["#", "+", "+", "#", "#", "+", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const findStartPoint = (point) => {
  const startPoint = {};
  const start = grid.find((elem, i) => {
    const targetArr = elem.includes(point);
    targetArr ? (startPoint.row = i) : null;
    return elem.includes(point);
  });
  start.forEach((item, i) => (item === point ? (startPoint.column = i) : null));
  return startPoint;
};

const findEndPoint = (point) => {
  const endPoint = {};
  grid.forEach((elem, i) => {
    elem.forEach((_, j) => {
      if ((i === 0 || i === grid.length - 1) && grid[i][j] === point) {
        endPoint.row = i;
        endPoint.column = j;
      }
      if ((j === 0 || j === grid[i].length - 1) && grid[i][j] === point) {
        endPoint.row = i;
        endPoint.column = j;
      }
    });
  });
  return endPoint;
};

const startPos = findStartPoint("0");
const ROWS = grid.length;
const COLS = grid[0].length;

const queue = [];

const posStatus = (pos, grid) => {
  let row = pos.row;
  let column = pos.column;
  if (row < 0 || row >= ROWS || column < 0 || column >= COLS) {
    return false;
  }
  if (grid[row][column] === "exit") {
    return "exit";
  }
  if (grid[row][column] === "#") {
    return "blocked";
  }
  return "accepted";
};

const findDir = (pos, dir, grid) => {
  const newPath = [...pos.path];
  newPath.push(dir);
  let row = pos.row;
  let column = pos.column;
  switch (dir) {
    case "Left":
      column -= 1;
      break;
    case "Right":
      column += 1;
      break;
    case "Up":
      row -= 1;
      break;
    case "Down":
      row += 1;
      break;
    default:
      break;
  }
  const newPos = {
    row,
    column,
    path: newPath,
    status: "",
  };
  newPos.status = posStatus(newPos, grid);
  if (newPos.status === "accepted") {
    grid[newPos.row][newPos.column] = "visited";
  }
  return newPos;
};
const findPath = (startPos, grid) => {
  const endPos = findEndPoint("+");
  if (!endPos.hasOwnProperty("row")) return false;
  grid[endPos.row][endPos.column] = "exit";
  const currPos = {
    row: startPos.row,
    column: startPos.column,
    path: [],
    status: "",
  };
  queue.push(currPos);
  while (queue.length) {
    const currPos = queue.shift();
    let newPos = findDir(currPos, "Right", grid);
    if (newPos.status === "exit") {
      return newPos.path;
    }
    if (newPos.status === "accepted") {
      queue.push(newPos);
    }
    newPos = findDir(currPos, "Left", grid);
    if (newPos.status === "exit") {
      return newPos.path;
    }
    if (newPos.status === "accepted") {
      queue.push(newPos);
    }
    newPos = findDir(currPos, "Up", grid);
    if (newPos.status === "exit") {
      return newPos.path;
    }
    if (newPos.status === "accepted") {
      queue.push(newPos);
    }
    newPos = findDir(currPos, "Down", grid);
    if (newPos.status === "exit") {
      return newPos.path;
    }
    if (newPos.status === "accepted") {
      queue.push(newPos);
    }
  }
  return false;
};

findPath(startPos, grid);
