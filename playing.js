function CheckValidPiece() {
    let row = parseInt(document.getElementById("Row").value);
    let col = parseInt(document.getElementById("Col").value);
    if (NewBoard.board[row][col].piece && (NewBoard.board[row][col].piece.team === whosTurn)) {
        let PossableMoves = NewBoard.board[row][col].piece.findPossable();
        if (PossableMoves.length) {
            for (let i = 0; i < PossableMoves.length; i++) {
                if (NewBoard.board[PossableMoves[i][0]][PossableMoves[i][1]].empty) {
                    document.getElementById("" + PossableMoves[i][0] + "" + PossableMoves[i][1] + "").style.opacity = '0.3';
                } else {
                    document.getElementById("" + PossableMoves[i][0] + "" + PossableMoves[i][1] + "").style.background = 'rgba(184,31,24,0.75)'
                }
            }
            document.getElementById("CheckValid").style.display = 'none';
            document.getElementById("Row").style.display = 'none';
            document.getElementById("Col").style.display = 'none';

            NewBoard.LoadMoves(PossableMoves);
        } else {
            console.log("Sorry, it doesn't look like that piece can move.")
        }
    } else if (NewBoard.board[row][col].piece) {
        console.log("This is not your piece");
    } else {
        console.log("please select a piece");
    }

}


function PlayMove() {
    let moveTo = document.getElementById("PossableMoveList").value;
    let fromRow = parseInt(document.getElementById("Row").value);
    let fromCol = parseInt(document.getElementById("Col").value);
    let backupBoard = NewBoard.copy();
    let playerOneInCheck = true;
    let playerTwoInCheck = true;

    if (moveTo === "Cancel") {
        NewBoard.UpdateVisual();

    } else {
        moveTo = moveTo.split(",");
        moveTo = [parseInt(moveTo[0]), parseInt(moveTo[1])];
        if (NewBoard.board[moveTo[0]][moveTo[1]].piece) {
            NewBoard.board[moveTo[0]][moveTo[1]].piece.alive = false;
        }

        NewBoard.board[moveTo[0]][moveTo[1]].piece = NewBoard.board[fromRow][fromCol].piece;
        NewBoard.board[moveTo[0]][moveTo[1]].piece.firstMove = false;
        NewBoard.board[moveTo[0]][moveTo[1]].empty = false;
        NewBoard.board[moveTo[0]][moveTo[1]].piece.row = moveTo[0];
        NewBoard.board[moveTo[0]][moveTo[1]].piece.col = moveTo[1];
        NewBoard.board[fromRow][fromCol] = new Tile(fromRow, fromCol);

        playerOneInCheck = NewBoard.CheckInCheck(0);
        playerTwoInCheck = NewBoard.CheckInCheck(1);

        console.log("Player one in check = " + playerOneInCheck);
        console.log("Player two in check = " + playerTwoInCheck);

        if (playerOneInCheck) {
            if (whosTurn === 0) {
                console.log("Sorry you cant move into check");
                NewBoard = backupBoard.copy();
            } else {
                console.log("You just put player 1 into check");
                whosTurn = 1 - whosTurn;
            }
        }


        if (playerTwoInCheck) {
            if (whosTurn === 1) {
                console.log("Sorry you cant move into check");
                NewBoard = backupBoard.copy();
            } else {
                console.log("You just put player 2 into check");
                whosTurn = 1 - whosTurn;
            }
        }

        if (!playerOneInCheck && !playerTwoInCheck) {
            whosTurn = 1 - whosTurn;
        }
            NewBoard.UpdateVisual();

        }


    }
    //TODO: highlight the selected tile
