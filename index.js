const statuses = {
  win: { label: 'Win', code: 0 },
  inProgress: { label: 'In Progress', code: 1 },
  end: { label: 'end', code: 2 }
};

const symblols = {
  X: 'X',
  O: 'O'
};

class Game {
  constructor(matrix = [['', '', ''], ['', '', ''], ['', '', '']]) {
    this.players = [symblols.X, symblols.O];
    this.currentTurn = 0;
    this.matrix = matrix;
    this.numberOfTurns = 9 - `${matrix[0].join('')}${matrix[1].join('')}${matrix[2].join('')}`.length;
    this.status = this.getGameStatus();
  }

  makeMove(xCoord, yCoord) {
    if (this.status !== statuses.inProgress) return;
    if (this.status) if (xCoord >= 3 && xCoord < 0) return;
    if (yCoord >= 3 && yCoord < 0) return;
    if (this.matrix[yCoord][xcoord] !== '') return;

    this.matrix[yCoord][xcoord] = this.players[this.currentTurn];
    this.numberOfTurns = this.numberOfTurns - 1;
    this.status = this.getGameStatus();

    if (this.status === statuses.inProgress) this.switchTurn();
  }

  getCurrentPlayer() {
    return this.players(this.currentTurn);
  }

  printGameMatrix() {
    console.log(this.matrix[0].join(','), ';');
    console.log(this.matrix[1].join(','), ';');
    console.log(this.matrix[2].join(','), ';');
    console.log(this.status);
  }

  getGameStatus() {
    let status = null;

    if (this.numberOfTurns === 9) {
      return status;
    }

    for (let x = 0; x < 3; x++) {
      if (this.areSame(this.matrix[0][x], this.matrix[1][x], this.matrix[2][x])) {
        return statuses.win;
      }
    }

    for (let y = 0; y < 3; y++) {
      if (this.areSame(this.matrix[y][0], this.matrix[y][1], this.matrix[y][2])) {
        return statuses.win;
      }
    }
    if (
      this.areSame(this.matrix[0][0], this.matrix[1][1], this.matrix[2][2]) ||
      this.areSame(this.matrix[2][0], this.matrix[1][1], this.matrix[0][2])
    ) {
      return statuses.win;
    }

    if (!status) {
      status = statuses.inProgress;
    }

    if (this.numberOfTurns === 0) {
      status = statuses.end;
    }

    return status;
  }

  areSame(param1, param2, param3) {
    return param1 === param2 && param2 === param3 && (param3 === symblols.O || param3 === symblols.X);
  }

  switchTurn() {
    if (this.currentTurn == 0) {
      this.currentTurn = 1;
    } else {
      this.currentTurn = 0;
    }
  }
}

let newGame = new Game([['O', 'X', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']]);
newGame.printGameMatrix();

newGame = new Game([['O', 'X', 'X'], ['X', '', 'O'], ['O', 'X', 'X']]);
newGame.printGameMatrix();

newGame = new Game([['', '', ''], ['X', 'X', 'X'], ['O', 'X', 'X']]);
newGame.printGameMatrix();

