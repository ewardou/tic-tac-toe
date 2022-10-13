let gameBoard=(function(){
    let boardValues=[" "," "," "," "," "," "," "," "," "];

    let cells=document.querySelectorAll(".container>div");
    // const renderBoardValues=()=>{
    //     for(let i=0;i<cells.length;i++){
    //         cells[i].textContent=boardValues[i];
    //     }
    // };
    for (let i=0;i<cells.length;i++){
        cells[i].setAttribute("data-index",i);
    }
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
    };
    cells.forEach(cell=>{
        cell.addEventListener("click",markCell)
    })

    let getBoard=()=>boardValues;
    return{
        getBoard,
        // renderBoardValues
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
        } else if (rowTwo==="XXX" || rowTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
        } else if (rowThree==="XXX" || rowThree==="OOO"){
            resultDisplay.textContent="We have a winner";
        }

        const columnOne=currentBoard[0]+currentBoard[3]+currentBoard[6];
        const columnTwo=currentBoard[1]+currentBoard[4]+currentBoard[7];
        const columnThree=currentBoard[2]+currentBoard[5]+currentBoard[8];
        if (columnOne==="XXX" || columnOne==="OOO"){
            resultDisplay.textContent="We have a winner";
        } else if (columnTwo==="XXX" || columnTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
        } else if (columnThree==="XXX" || columnThree==="OOO"){
            resultDisplay.textContent="We have a winner";
        }

        const diagonalOne=currentBoard[0]+currentBoard[4]+currentBoard[8];
        const diagonalTwo=currentBoard[2]+currentBoard[4]+currentBoard[6];
        if (diagonalOne==="XXX" || diagonalOne==="OOO"){
            resultDisplay.textContent="We have a winner";
        } else if (diagonalTwo==="XXX" || diagonalTwo==="OOO"){
            resultDisplay.textContent="We have a winner";
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