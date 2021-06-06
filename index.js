const grid = [
  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],

  ["#", "+", "+", "+", "#", "+", "+", "+", "#"],

  ["#", "+", "#", "+", "#", "+", "#", "+", "#"],

  ["+", "+", "#", "+", "0", "+", "#", "+", "#"],

  ["#", "#", "#", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "+", "#", "#", "#", "#", "#"],

  ["#", "#", "+", "#", "#", "#", "#", "#", "#"],

  ["#", "#", "#", "#", "#", "#", "#", "#", "#"],
];

const findStartPoint = () => {
  const startPoint = {};
  grid.forEach((elem, i) => {
    elem.forEach((_, j) => {
      if (grid[i][j] === "0") {
        startPoint.row = i;
        startPoint.column = j;
      }
    });
  });
  return startPoint;
};

const findEndPoint = () => {
  const endPoint = {};
  grid.forEach((elem, i) => {
    elem.forEach((_, __) => {
      if (grid[i][0] === "+") {
        endPoint.row = i;
        endPoint.column = 0;
      } else if (grid[0][i] === "+" || grid[grid.length - 1][i] === "+") {
        endPoint.row = grid.length - 1 || 0;
        endPoint.column = i;
      }
    });
  });
  return endPoint;
};

const startPos = findStartPoint();
const endPos = findEndPoint();
const ROWS = grid.length;
const COLS = grid[0].length;

grid[endPos.row][endPos.column] = "exit";

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
