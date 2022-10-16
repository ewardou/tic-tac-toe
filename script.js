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
        gameController.changeCurrentPlayer();
        gameController.checkWinner();
        event.target.removeEventListener("click",markCell);
        event.target.classList.remove("available");
        if (gameController.getCurrentPlayer().getName()==="CPU"){
            setTimeout(cpuController.makeMove,300);
        }
    };

    const initializeBoard=function(){
        for (let i=0;i<cells.length;i++){
            cells[i].setAttribute("data-index",i);
            cells[i].classList.add("available");
            cells[i].addEventListener("click",markCell);
        };    
    };

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
    let modifyBoardValue=function(index,newValue){
        boardValues[index]=newValue;
    };

    const restartBoard=()=>{
        boardValues=[" "," "," "," "," "," "," "," "," "];
        renderBoardValues();
        initializeBoard();
        cells.forEach(cell=>{
            cell.classList.remove("winner");
        });
        restartButton.classList.remove("restart");
        document.querySelector(".result").textContent="";
        gameController.selectFirstPlayer();
    };

    restartButton.addEventListener("click",restartBoard);

    return{
        getBoard,
        stopPlaying,
        highlightWinnerCells,
        modifyBoardValue,
        renderBoardValues,
        markCell,
        initializeBoard
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
        resultDisplay.textContent=`${currentPlayer.getName()}'s turn`;
        if (currentPlayer.getName()==="CPU"){
            setTimeout(cpuController.makeMove,300);
        }
    };
    let changeCurrentPlayer=()=>{
        if (currentPlayer===groupOfPlayers[0]){
            currentPlayer=groupOfPlayers[1];
        } else {
            currentPlayer=groupOfPlayers[0];
        };
        resultDisplay.textContent=`${currentPlayer.getName()}'s turn`;
    };
    let getCurrentPlayer=()=>currentPlayer;

    let startGamePvP=function(){
        let player1Name=document.querySelector("#player1").value;
        let player2Name=document.querySelector("#player2").value;

        if (player1Name===""){player1Name="Player 1"};
        if (player2Name==="" || player2Name==="CPU"){player2Name="Player 2"};
        let player1=Player(player1Name);
        let player2=Player(player2Name);

        addNewPlayer(player1);
        addNewPlayer(player2);

        let player1NameDisplay=document.querySelector(".player1>p");
        player1NameDisplay.textContent=`${groupOfPlayers[0].getName()} ( X )`;

        let player2NameDisplay=document.querySelector(".player2>p");
        player2NameDisplay.textContent=`${groupOfPlayers[1].getName()} ( O )`;

        selectFirstPlayer();
        document.querySelector(".menu").setAttribute("style","transform:scale(0)");
        gameBoard.initializeBoard();
    }

    let startGameButton=document.querySelector(".start");
    startGameButton.addEventListener("click",startGamePvP);

    let startGamePvCPU=function(){
        let playerName=document.querySelector("#player").value;

        if (playerName===""){playerName="Player 1"};
        let player1=Player(playerName);
        let player2=Player("CPU");

        document.querySelector(".player2>img").setAttribute("src","./icons/robot.png");

        addNewPlayer(player1);
        addNewPlayer(player2);

        let player1NameDisplay=document.querySelector(".player1>p");
        player1NameDisplay.textContent=`${groupOfPlayers[0].getName()} ( X )`;

        let player2NameDisplay=document.querySelector(".player2>p");
        player2NameDisplay.textContent=`${groupOfPlayers[1].getName()} ( O )`;

        document.querySelector(".menu").setAttribute("style","transform:scale(0)");
        gameBoard.initializeBoard();
        selectFirstPlayer();
    }
    
    let starGameAgainstCPU=document.querySelector(".start.cpu");
    starGameAgainstCPU.addEventListener("click",startGamePvCPU);

    let checkWinner=function(){
        let currentBoard=gameBoard.getBoard();


        const rowOne=currentBoard[0]+currentBoard[1]+currentBoard[2];
        const rowTwo=currentBoard[3]+currentBoard[4]+currentBoard[5];
        const rowThree=currentBoard[6]+currentBoard[7]+currentBoard[8];
        if (rowOne==="XXX" || rowOne==="OOO"){
            changeCurrentPlayer(); // Return to the winner
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,1,2);
        } else if (rowTwo==="XXX" || rowTwo==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(3,4,5);
        } else if (rowThree==="XXX" || rowThree==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(6,7,8);
        }

        const columnOne=currentBoard[0]+currentBoard[3]+currentBoard[6];
        const columnTwo=currentBoard[1]+currentBoard[4]+currentBoard[7];
        const columnThree=currentBoard[2]+currentBoard[5]+currentBoard[8];
        if (columnOne==="XXX" || columnOne==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,3,6);
        } else if (columnTwo==="XXX" || columnTwo==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(1,4,7);
        } else if (columnThree==="XXX" || columnThree==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(2,5,8);
        }

        const diagonalOne=currentBoard[0]+currentBoard[4]+currentBoard[8];
        const diagonalTwo=currentBoard[2]+currentBoard[4]+currentBoard[6];
        if (diagonalOne==="XXX" || diagonalOne==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(0,4,8);
        } else if (diagonalTwo==="XXX" || diagonalTwo==="OOO"){
            changeCurrentPlayer();
            resultDisplay.textContent=`${currentPlayer.getName()} wins`;
            gameBoard.stopPlaying();
            return gameBoard.highlightWinnerCells(2,4,6);
        }
        
        if (currentBoard.every(cell=>cell!==" ")){
            gameBoard.stopPlaying();
            return resultDisplay.textContent="It's a tie";
        };
    };

    return {
        addNewPlayer,
        changeCurrentPlayer,
        selectFirstPlayer,
        getCurrentPlayer,
        checkWinner
    }
})();

let cpuController=(function(){
    let choseRandomIndex=function(){
        let currentBoard=gameBoard.getBoard();
        if (!(currentBoard.includes(" "))){return};
        let randomIndex=Math.floor(Math.random()*9);
        while (currentBoard[randomIndex]!==" "){
            randomIndex=Math.floor(Math.random()*9);
        }
        return randomIndex;
    };

    let makeMove=function(){
        let index;
        if (typeof(checkPossibleEndGame())==="number"){
            index=checkPossibleEndGame();
        } else {
            index=choseRandomIndex();
            if (index===undefined){return}
        };
        gameBoard.modifyBoardValue(index,"O");
        gameBoard.renderBoardValues();
        document.querySelector(`div[data-index="${index}"]`).removeEventListener("click",gameBoard.markCell);
        document.querySelector(`div[data-index="${index}"]`).classList.remove("available");
        gameController.changeCurrentPlayer();
        gameController.checkWinner();
    };

    let checkPossibleEndGame=function(){
        let currentBoard=gameBoard.getBoard();
        let reg1=/(OO )|(O O)|( OO)/;
        let reg2=/(XX )|(X X)|( XX)/;

        let regex=[reg1,reg2];

        let rowsArray=[currentBoard.slice(0,3).join(""),currentBoard.slice(3,6).join(""),currentBoard.slice(6).join("")];
        let columnsArray=[currentBoard[0]+currentBoard[3]+currentBoard[6],currentBoard[1]+currentBoard[4]+currentBoard[7],currentBoard[2]+currentBoard[5]+currentBoard[8]];
        let diagonalsArray=[currentBoard[0]+currentBoard[4]+currentBoard[8],currentBoard[2]+currentBoard[4]+currentBoard[6]];

        for (let j=0;j<2;j++){
            for (let i=0;i<3;i++){
                if (regex[j].test(rowsArray[i])){
                    let match=rowsArray[i];
                    let indexOfBlank=match.indexOf(" ");
                    return indexOfBlank+(i*3);
                };
            };

            for (let i=0;i<3;i++){
                if (regex[j].test(columnsArray[i])){
                    let match=columnsArray[i];
                    let indexOfBlank=match.indexOf(" ");
                    return (indexOfBlank*3)+i;
                };
            };

            for (let i=0;i<2;i++){
                if (regex[j].test(diagonalsArray[i])){
                    let match=diagonalsArray[i];
                    let indexOfBlank=match.indexOf(" ");
                    if (i===0){
                        return indexOfBlank*4;
                    } else if (i===1){
                        return (indexOfBlank+i)*2;
                    }
                };
            };
        }
    }

    return{
        makeMove
    }
})();