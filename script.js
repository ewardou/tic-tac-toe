let gameBoard=(function(){
    let boardValues=["X","X","O"," ","O","X"," ","O","O"];
    let cells=document.querySelectorAll(".container>div");
    const renderBoardValues=()=>{
        for(let i=0;i<cells.length;i++){
            cells[i].textContent=boardValues[i];
        }
    };
    let getBoard=()=>boardValues;
    return{
        getBoard,
        renderBoardValues
    }
})();

const Player=function(name){
    let getName=()=>name;
    return {
        getName
    }
};

const displayController=(function(){
    return {

    }
})();