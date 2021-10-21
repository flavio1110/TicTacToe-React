const SIZE = 3;
const getInitialBoard = () => {
  let boarMap = [];

  for (let row = 0; row < SIZE; row++) {
    let rowArray = [];
    for (let column = 0; column < SIZE; column++) {
      rowArray.push({
        currentSymbol: "",
        selected: false,
        row: row,
        column: column,
      });
    }
    boarMap.push(rowArray);
  }
  return boarMap;
};

const cloneBoardMap = (boardMap) => {
  let clone = [];

  for (let row = 0; row < boardMap.length; row++) {
    clone[row] = [...boardMap[row]];
  }
  return clone;
};

const isThereAWinner = (boardMap) => {
  //check rows
  for (let row = 0; row < SIZE; row++) {
    if (sequenceMatches(boardMap[row])) return true;
  }

  // check rows
  for (let column = 0; column < SIZE; column++) {
    const elements = [
      boardMap[0][column],
      boardMap[1][column],
      boardMap[2][column],
    ];

    if (sequenceMatches(elements)) return true;
  }

  // check diagonals
  const diagonals = [
    [boardMap[0][0], boardMap[1][1], boardMap[2][2]],
    [boardMap[0][2], boardMap[1][1], boardMap[2][0]],
  ];

  diagonals.push();
  diagonals.push([boardMap[0][2], boardMap[1][1], boardMap[2][0]]);

  for (let index = 0; index < SIZE; index++) {
    if (sequenceMatches(diagonals[index])) return true;
  }

  return false;
};

const sequenceMatches = (elements) => {
  var previousSymbol = null;
  for (let index = 0; index < SIZE; index++) {
    const element = elements[index];
    const isLastToBeChecked = index === SIZE - 1;
    const result = symbolMatchesToTheSequence(
      previousSymbol,
      element,
      isLastToBeChecked
    );

    if (result === MatchOutcome.StopLooking) break;

    if (result === MatchOutcome.ContinueLooking) {
      previousSymbol = element.currentSymbol;
      continue;
    }

    if (result === MatchOutcome.Success) return true;
  }
  return false;
};

const symbolMatchesToTheSequence = (
  previousSymbol,
  element,
  isLastToBeChecked
) => {
  const isSelected = (symbol) => symbol !== "";

  if (!isSelected(element.currentSymbol)) return MatchOutcome.StopLooking;

  if (previousSymbol == null) return MatchOutcome.ContinueLooking;

  if (element.currentSymbol !== previousSymbol) return MatchOutcome.StopLooking;

  if (isLastToBeChecked) return MatchOutcome.Success;
};

const MatchOutcome = {
  StopLooking: "StopLooking",
  ContinueLooking: "ContinueLooking",
  Success: "Success",
};

export { getInitialBoard, cloneBoardMap, isThereAWinner };
