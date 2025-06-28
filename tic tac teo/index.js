const boxs = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const gameBtn = document.querySelector(".btn");


 let currentPlayer;
 let gameGrid;
 console.log("start");

 const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

 ];

//  lat,s create a funtion to intialise a game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxs.forEach((box, index) => {
        box.innerText = "";
        boxs[index].style.pointerEventS ="all";
        box.classList = `box box${index+1}`
    })
    gameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


initGame();
function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
function checkGameOver(){
    let anwser = "";
    winningPosition.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] == gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])){
        if(gameGrid[position] = "X")
            anwser = "X";
        
        else
            anwser = "O"


            boxs.forEach((box) =>{
                box.style.pointerEventS ="None";
            })

            boxs[position[0]].classList.add("win");
            boxs[position[1]].classList.add("win");
            boxs[position[2]].classList.add("win");
        }


    }) ;
    if(anwser !== ""){
        gameInfo.innerText = `Winner player- ${anwser}`;
        gameBtn.classList.add("active");
        return;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        fillCount++;
    });

    if(fillCount == 9){
        gameInfo.innerText = "Game tied";
        gameBtn.classList.add("active");
    }

}

 function handleClick(index){
    if(gameGrid[index]===""){
        boxs[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxs[index].style.pointerEventS ="None";
        swapTurn();
        checkGameOver();
    }
 }

boxs.forEach((box, index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});
 

gameBtn.addEventListener("click",initGame);