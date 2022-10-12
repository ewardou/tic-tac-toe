let gameBoard=(function(){
    let boardValues=["X","X","O"," ","O","X"," ","O","O"];
    let getBoard=()=>boardValues;
    return{
        getBoard
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