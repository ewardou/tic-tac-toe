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
    return {
        addNewPlayer,
        changeCurrentPlayer,
        selectFirstPlayer,
        getCurrentPlayer
    }
})();

let eduardo=Player("eduardo");
let andres=Player("andres");

gameController.addNewPlayer(eduardo);
gameController.addNewPlayer(andres);

gameController.selectFirstPlayer();