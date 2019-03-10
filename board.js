let mainTableText;
let whosTurn = 0;
const promtMove = ", Select piece to move (in the form A,1):";

function Board() {
    this.board = [];
    for (let i = 0; i < 8; i++) {
        this.board[i] = [];
        for (let j = 0; j < 8; j++) {
            this.board[i][j] = new Tile(i,j);
        }
    }
    this.player1PieceList = [];
    this.player2PieceList = [];



    this.init = function () {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].empty = false;
                if (i === 1) {
                    this.board[i][j].piece = new Piece("Pawn", this.board[i][j].row, this.board[i][j].col, 1, true);
                } else if (j === 0 || j === 7) {
                    this.board[i][j].piece = new Piece("Rook", this.board[i][j].row, this.board[i][j].col, 1, true);
                } else if (j === 1 || j === 6) {
                    this.board[i][j].piece = new Piece("Knight", this.board[i][j].row, this.board[i][j].col, 1, true);
                } else if (j === 2 || j === 5) {
                    this.board[i][j].piece = new Piece("Bishop", this.board[i][j].row, this.board[i][j].col, 1, true);
                } else if (j === 3) {
                    this.board[i][j].piece = new Piece("King", this.board[i][j].row, this.board[i][j].col, 1, true);
                } else if (j === 4) {
                    this.board[i][j].piece = new Piece("Queen", this.board[i][j].row, this.board[i][j].col, 1, true);
                }
                this.player2PieceList.push(this.board[i][j].piece);
            }
        }
        // this.board[3][3].piece = new Piece("King", this.board[3][3].row, this.board[3][3].col, 1, true);
        // this.player2PieceList.push(this.board[3][3].piece);
        // this.board[3][3].empty = false;


        for (let i = 6; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.board[i][j].empty = false;
                if (i === 6) {
                    this.board[i][j].piece = new Piece("Pawn", this.board[i][j].row, this.board[i][j].col, 0, true);
                } else if (j === 0 || j === 7) {
                    this.board[i][j].piece = new Piece("Rook", this.board[i][j].row, this.board[i][j].col, 0, true);
                } else if (j === 1 || j === 6) {
                    this.board[i][j].piece = new Piece("Knight", this.board[i][j].row, this.board[i][j].col, 0, true);
                } else if (j === 2 || j === 5) {
                    this.board[i][j].piece = new Piece("Bishop", this.board[i][j].row, this.board[i][j].col, 0, true);
                } else if (j === 3) {
                    this.board[i][j].piece = new Piece("Queen", this.board[i][j].row, this.board[i][j].col, 0, true);
                } else if (j === 4) {
                    this.board[i][j].piece = new Piece("King", this.board[i][j].row, this.board[i][j].col, 0, true);
                }
                this.player1PieceList.push(this.board[i][j].piece);
            }
        }
    };

    this.CheckInCheck = function(player) {
        let King = [];
        let possableNextMoves;
        let list;
        let other;
        if (player === 0) {
            list = this.player1PieceList;
            other = this.player2PieceList;
        } else {
            list = this.player2PieceList;
            other = this.player1PieceList;
        }

        for (let i = 0; i < list.length; i++) {
            if (list[i].type === "King") {
                King = [list[i].row, list[i].col];
            }
        }

        for(let i = 0; i < other.length; i++) {
            if (other[i].alive) {
                possableNextMoves = other[i].findPossable();
                for (let j = 0; j < possableNextMoves.length; j++) {
                    if (possableNextMoves[j][0] === King[0] && possableNextMoves[j][1] === King[1]) {
                        return true;
                    }
                }
            }
        }
        return false;
    };


    this.copy = function () {
        let copy = new Board();
        let cur = this.board;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (!cur[i][j].empty) {
                    copy.board[i][j].piece = new Piece(cur[i][j].piece.type, cur[i][j].row, cur[i][j].col, cur[i][j].piece.team, cur[i][j].piece.firstMove);
                    copy.board[i][j].empty = false;
                    if (copy.board[i][j].piece.team === 0) {
                        copy.player1PieceList.push(copy.board[i][j].piece);
                    } else {
                        copy.player2PieceList.push(copy.board[i][j].piece);
                    }
                }
            }
        }
        return copy;
    };


    this.UpdateVisual = function() {
        mainTableText = "";
        for (let i = 0; i < 8; i++) {
            mainTableText += "<tr>";
            for (let j = 0; j < 8; j++) {
                mainTableText += "<td id='" + i + "" + j + "' class='";
                if (i%2 !== j%2) {
                    mainTableText += "black";
                } else {
                    mainTableText += "white";
                }

                if (this.board[i][j].piece) {
                    mainTableText += " team" + this.board[i][j].piece.team;
                }
                mainTableText += "'> ";
                if (this.board[i][j].piece) {
                    mainTableText += this.board[i][j].piece.type
                }
                mainTableText += "</td>";
            }
            mainTableText += "</tr>";
        }
        document.getElementById("RenderBoard").innerHTML = mainTableText;
        document.getElementById("PlayersTurn").innerHTML = "Player " + (whosTurn+1) + promtMove;
        document.getElementById("PossableMoveList").style.display='none';
        document.getElementById("SelectMove").style.display='none';
        document.getElementById("CheckValid").style.display = '';
        document.getElementById("Row").style.display = '';
        document.getElementById("Col").style.display = '';
        this.ShowCols(whosTurn);

    };


    this.LoadMoves = function(PossableMoves) {
        let innerHtml = "";
        for (let i = 0; i < PossableMoves.length; i++) {
            innerHtml += "<option value=\"" + PossableMoves[i] + "\">" + String.fromCharCode(65 + PossableMoves[i][1]) + " " + (PossableMoves[i][0] + 1) + "</option>";
        }
        innerHtml += "<option value=\"" + "Cancel" + "\">Cancel</option>";

        document.getElementById("PossableMoveList").style.display='';
        document.getElementById("PossableMoveList").innerHTML = innerHtml;
        document.getElementById("SelectMove").style.display='';
    };

    this.ShowCols = function (whosTurn) {
        let colID = document.getElementById("Col");
        let newOption;

        for (let i = colID.options.length-1; i >= 0; i--) {
            colID.remove(i);
        }

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (!this.board[j][i].empty && this.board[j][i].piece.team === whosTurn) {
                    newOption = document.createElement("option");
                    newOption.text = String.fromCharCode(65 + i);
                    newOption.value = i;
                    colID.options.add(newOption);
                    break;
                }
            }
        }
        this.ShowRows();
    };

    this.ShowRows = function() {
        let col = document.getElementById("Col").value;

        let rowID = document.getElementById("Row");
        let newOption;

        for (let i = rowID.options.length-1; i >= 0; i--) {
            rowID.remove(i);
        }

        for (let i = 0; i < this.board.length; i++) {
            if (!this.board[i][col].empty && this.board[i][col].piece.team === whosTurn) {
                newOption = document.createElement("option");
                newOption.text = i+1;
                newOption.value = i;
                rowID.options.add(newOption);
            }
        }
    }
}