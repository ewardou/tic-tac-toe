let gameBoard=(function(){
    let boardValues=[" "," "," "," "," "," "," "," "," "];
    let restartButton=document.querySelector("div>button");

    let cells=document.querySelectorAll(".container>div");
    const renderBoardValues=()=>{
        for(let i=0;i<cells.length;i++){
            cells[i].textContent=boardValues[i];
        }
    };
    let updateBoardValues=(event)=>{
        let index=event.target.getAttribute("data-index");
        boardValues[index]=gameController.getCurrentPlayer().getMarker();
    };

    let markCell=(event)=>{
        event.target.textContent=gameController.getCurrentPlayer().getMarker();
        updateBoardValues(event);
        gameController.checkWinner();
        gameController.changeCurrentPlayer();
        event.target.removeEventListener("click",markCell);
        event.target.classList.remove("available");
    };
    const initializeBoard=function(){
        for (let i=0;i<cells.length;i++){
            cells[i].setAttribute("data-index",i);
            cells[i].classList.add("available");
            cells[i].addEventListener("click",markCell);
        };    
    };
    initializeBoard();

    let stopPlaying=function(){
        cells.forEach(cell=>{
            cell.removeEventListener("click",markCell);
            cell.classList.remove("available");
        })
        restartButton.classList.add("restart");
    };

    let highlightWinnerCells=function(indexOne,indexTwo,indexThree){
        const firstCell=document.querySelector(`div[data-index="${indexOne}"]`);
        const secondCell=document.querySelector(`div[data-index="${indexTwo}"]`);
        const thirdCell=document.querySelector(`div[data-index="${indexThree}"]`);    

        firstCell.classList.add("winner");
        secondCell.classList.add("winner");
        thirdCell.classList.add("winner");
    };

    let getBoard=()=>boardValues;

    const restartBoard=()=>{
        boardValues=[" "," "," "," "," "," "," "," "," "];
        renderBoardValues();
        initializeBoard();
        cells.forEach(cell=>{
            cell.classList.remove("winner");
        });
        restartButton.classList.remove("restart");
        document.querySelector(".result").textContent="";
    };

    restartButton.addEventListener("click",restartBoard);

    return{
        getBoard,
        stopPlaying,
        highlightWinnerCells
    }
})();

const Player=function(name){
    let getName=()=>name;
    const marker=Markers.assignMarker();
    const getMarker=()=> marker;
    return {
        getName,
        getMarker
    }
};

const Markers=(function(){
    let availableMarker=["X","O"];
    let assignMarker=()=>availableMarker.shift();
    return {
        assignMarker
    }
})();

const gameController=(function(){
    let groupOfPlayers=[];
    let resultDisplay=document.querySelector(".result");

    let addNewPlayer=(newPlayer)=>groupOfPlayers.push(newPlayer);
    let currentPlayer;
    let selectFirstPlayer=()=>{
        const index=Math.floor(Math.random()*2);
        currentPlayer=groupOfPlayers[index];
    };
    let changeCurrentPlayer=()=>{
        if (currentPlayer===groupOfPlayers[0]){
            currentPlayer=groupOfPlayers[1];
        } else {
            currentPlayer=groupOfPlayers[0];
        };
    };
    let getCurrentPlayer=()=>currentPlayer;

    let checkWinner=function(){
        let currentBoard=gameBoard.getBoard();


        const rowOne=currentBoard[0]+currentBoard[1]+currentBoard[2];
        const rowTwo=currentBoard[3]+currentBoard[4]+currentBoard[5];
        const rowThree=currentBoard[6]+currentBoard[7]+currentBoard[8];
        if (rowOne==="XXX" || rowOne==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,1,2);
        } else if (rowTwo==="XXX" || rowTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(3,4,5);
        } else if (rowThree==="XXX" || rowThree==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(6,7,8);
        }

        const columnOne=currentBoard[0]+currentBoard[3]+currentBoard[6];
        const columnTwo=currentBoard[1]+currentBoard[4]+currentBoard[7];
        const columnThree=currentBoard[2]+currentBoard[5]+currentBoard[8];
        if (columnOne==="XXX" || columnOne==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,3,6);
        } else if (columnTwo==="XXX" || columnTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(1,4,7);
        } else if (columnThree==="XXX" || columnThree==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(2,5,8);
        }

        const diagonalOne=currentBoard[0]+currentBoard[4]+currentBoard[8];
        const diagonalTwo=currentBoard[2]+currentBoard[4]+currentBoard[6];
        if (diagonalOne==="XXX" || diagonalOne==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,4,8);
        } else if (diagonalTwo==="XXX" || diagonalTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(2,4,6);
        }
        
        if (currentBoard.every(cell=>cell!==" ")){
            gameBoard.stopPlaying();
            return resultDisplay.textContent="It's a tie"
        }
    };

    return {
        addNewPlayer,
        changeCurrentPlayer,
        selectFirstPlayer,
        getCurrentPlayer,
        checkWinner
    }
})();

let eduardo=Player("eduardo");
let andres=Player("andres");

gameController.addNewPlayer(eduardo);
gameController.addNewPlayer(andres);

gameController.selectFirstPlayer();