function Piece (type, row, col, team, firstMove) {
    this.type = type;
    this.row = row;
    this.col = col;
    this.alive = true;
    this.team = team;
    this.firstMove = firstMove;
    this.possableMoves = [];
//TODO: Make piece class and inherantence

    this.findPossable = function() {
        let PossableMoves = [];
        let direction;
        //---------------------------   PAWN    -------------------------------------
        if (this.type === "Pawn") {
            if (this.team === 0) {
                direction = -1;
            } else {
                direction = 1;
            }

            if (this.firstMove) {
                if (!NewBoard.board[this.row + (direction * 2)][this.col].piece) {
                    PossableMoves.push([this.row + (direction * 2), this.col])
                }
            }

            if (this.col < 7 && NewBoard.board[this.row + direction][this.col + 1].piece &&
                NewBoard.board[this.row + direction][this.col + 1].piece.team !== this.team) {
                PossableMoves.push([this.row + direction, this.col + 1]);
            }

            if (!NewBoard.board[this.row + direction][this.col].piece) {
                PossableMoves.push([this.row + direction, this.col]);
            }

            if (this.col > 0 && NewBoard.board[this.row + direction][this.col - 1].piece &&
                NewBoard.board[this.row + direction][this.col - 1].piece.team !== this.team) {
                PossableMoves.push([this.row + direction, this.col - 1]);
            }
            //-----------------------------     ROOK    -----------------------------------
        } else if (this.type === "Rook") {
            for (let i = this.row+1; i < 8; i++) {
                if (!NewBoard.board[i][this.col].piece) {
                    PossableMoves.push([i,this.col]);
                } else {
                    if (NewBoard.board[i][this.col].piece.team !== this.team){
                        PossableMoves.push([i,this.col]);
                    }
                    break;
                }
            }

            for (let i = this.row-1; i >= 0; i--) {
                if (!NewBoard.board[i][this.col].piece) {
                    PossableMoves.push([i,this.col]);
                } else {
                    if (NewBoard.board[i][this.col].piece.team !== this.team){
                        PossableMoves.push([i,this.col]);
                    }
                    break;
                }
            }

            for (let i = this.col+1; i < 8; i++) {
                if (!NewBoard.board[this.row][i].piece) {
                    PossableMoves.push([this.row,i]);
                } else {
                    if (NewBoard.board[this.row][i].piece.team !== this.team){
                        PossableMoves.push([this.row,i]);
                    }
                    break;
                }
            }

            for (let i = this.col-1; i >= 0; i--) {
                if (!NewBoard.board[this.row][i].piece) {
                    PossableMoves.push([this.row,i]);
                } else {
                    if (NewBoard.board[this.row][i].piece.team !== this.team){
                        PossableMoves.push([this.row,i]);
                    }
                    break;
                }
            }
            //------------------------------    Knight  -------------------------------------------
        } else if (this.type === "Knight") {
            let variations = [[1,2], [1,-2], [-1,2], [-1,-2], [2,-1], [2,1], [-2,1], [-2,-1]];
            for (let i = 0; i < variations.length; i++) {
                if (this.row + variations[i][0] >= 0 && this.row + variations[i][0] < 8 &&
                    this.col + variations[i][1] >= 0 && this.col + variations[i][1] < 8) {

                    if (!NewBoard.board[this.row + variations[i][0]][this.col + variations[i][1]].piece) {
                        PossableMoves.push([(this.row + variations[i][0]),(this.col + variations[i][1])]);
                    } else if (NewBoard.board[this.row + variations[i][0]][this.col +
                        variations[i][1]].piece.team !== this.team) {
                        PossableMoves.push([(this.row + variations[i][0]),(this.col + variations[i][1])]);
                    }
                }
            }
            //-----------------------------------   Bishop  ----------------------------------------------------
        } else if (this.type === "Bishop") {
            for (let i = 1; i < Math.min(8-this.row, 8-this.col); i++) {
                if (!NewBoard.board[this.row + i][this.col + i].piece) {
                    PossableMoves.push([this.row + i,this.col + i]);
                } else {
                    if (NewBoard.board[this.row + i][this.col + i].piece.team !== this.team) {
                        PossableMoves.push([this.row + i,this.col + i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(this.row+1, this.col+1); i++) {
                if (!NewBoard.board[this.row - i][this.col - i].piece) {
                    PossableMoves.push([this.row - i,this.col - i]);
                } else {
                    if (NewBoard.board[this.row - i][this.col - i].piece.team !== this.team) {
                        PossableMoves.push([this.row - i,this.col - i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(8-this.row, this.col+1); i++) {
                if (!NewBoard.board[this.row + i][this.col - i].piece) {
                    PossableMoves.push([this.row + i,this.col - i]);
                } else {
                    if (NewBoard.board[this.row + i][this.col - i].piece.team !== this.team) {
                        PossableMoves.push([this.row + i,this.col - i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(this.row+1, 8-this.col); i++) {
                if (!NewBoard.board[this.row - i][this.col + i].piece) {
                    PossableMoves.push([this.row - i,this.col + i]);
                } else {
                    if (NewBoard.board[this.row - i][this.col + i].piece.team !== this.team) {
                        PossableMoves.push([this.row - i,this.col + i]);
                    }
                    break;
                }
            }
            //----------------------------------------------    QUEEN   ---------------------------------------------
        } else if (this.type === "Queen") {

            for (let i = this.row+1; i < 8; i++) {
                if (!NewBoard.board[i][this.col].piece) {
                    PossableMoves.push([i,this.col]);
                } else {
                    if (NewBoard.board[i][this.col].piece.team !== this.team){
                        PossableMoves.push([i,this.col]);
                    }
                    break;
                }
            }

            for (let i = this.row-1; i >= 0; i--) {
                if (!NewBoard.board[i][this.col].piece) {
                    PossableMoves.push([i,this.col]);
                } else {
                    if (NewBoard.board[i][this.col].piece.team !== this.team){
                        PossableMoves.push([i,this.col]);
                    }
                    break;
                }
            }

            for (let i = this.col+1; i < 8; i++) {
                if (!NewBoard.board[this.row][i].piece) {
                    PossableMoves.push([this.row,i]);
                } else {
                    if (NewBoard.board[this.row][i].piece.team !== this.team){
                        PossableMoves.push([this.row,i]);
                    }
                    break;
                }
            }

            for (let i = this.col-1; i >= 0; i--) {
                if (!NewBoard.board[this.row][i].piece) {
                    PossableMoves.push([this.row,i]);
                } else {
                    if (NewBoard.board[this.row][i].piece.team !== this.team){
                        PossableMoves.push([this.row,i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(8-this.row, 8-this.col); i++) {
                if (!NewBoard.board[this.row + i][this.col + i].piece) {
                    PossableMoves.push([this.row + i,this.col + i]);
                } else {
                    if (NewBoard.board[this.row + i][this.col + i].piece.team !== this.team) {
                        PossableMoves.push([this.row + i,this.col + i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(this.row+1, this.col+1); i++) {
                if (!NewBoard.board[this.row - i][this.col - i].piece) {
                    PossableMoves.push([this.row - i,this.col - i]);
                } else {
                    if (NewBoard.board[this.row - i][this.col - i].piece.team !== this.team) {
                        PossableMoves.push([this.row - i,this.col - i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(8-this.row, this.col+1); i++) {
                if (!NewBoard.board[this.row + i][this.col - i].piece) {
                    PossableMoves.push([this.row + i,this.col - i]);
                } else {
                    if (NewBoard.board[this.row + i][this.col - i].piece.team !== this.team) {
                        PossableMoves.push([this.row + i,this.col - i]);
                    }
                    break;
                }
            }

            for (let i = 1; i < Math.min(this.row+1, 8-this.col); i++) {
                if (!NewBoard.board[this.row - i][this.col + i].piece) {
                    PossableMoves.push([this.row - i,this.col + i]);
                } else {
                    if (NewBoard.board[this.row - i][this.col + i].piece.team !== this.team) {
                        PossableMoves.push([this.row - i,this.col + i]);
                    }
                    break;
                }
            }
            //-----------------------------------   KING    --------------------------------------------
        } else if (this.type === "King") {
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i !== 0 || j !== 0) {
                        if (this.row + i >= 0 && this.row + i < 8 && this.col + j >= 0 && this.col + j < 8) {
                            if (!NewBoard.board[this.row + i][this.col + j].piece) {
                                PossableMoves.push([this.row + i,this.col + j]);
                            } else if (NewBoard.board[this.row + i][this.col + j].piece.team !== this.team) {
                                PossableMoves.push([this.row + i, this.col + j]);
                            }
                        }
                    }
                }
            }
        }
        // this.possableMoves = PossableMoves;
        return PossableMoves;
    };


}
