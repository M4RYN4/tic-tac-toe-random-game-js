//https://rolling-scopes-school.github.io/m4ryn4-JSFEPRESCHOOL2023Q2/random-game/

const cells = document.querySelectorAll(".cell");
const txtCont = document.querySelector("#text-content");
const newGameBtn = document.querySelector("#btn-new-game");
const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let cellsOptions = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gamePlay = false;

let score = [];
const nextRoundBtn = document.querySelector("#btn-next-round");
const gameScore = document.querySelector("#games-score");
//1
initializeGame();
//1.2
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));//1.3
    newGameBtn.addEventListener("click", restartGame);//1.4
    let fight = new Audio('audio/fight.mp3');
    fight.play();

    nextRoundBtn.addEventListener("click", nextRoundGame);

    txtCont.textContent = `${currentPlayer}'s turn`;
    gamePlay = true;
}
//2
function cellClicked(){
    const idx = this.getAttribute("idx");//If does not exist, value = ""

    if(cellsOptions[idx] != "" || gamePlay == false){//!!disallow to click TWICE if cell has something & game is not finished
        return;
    }

    updateCell(this, idx);//3
    checkWinner();//4
}
//3
function updateCell(cell, index){
    cellsOptions[index] = currentPlayer;//upd backend
    cell.textContent = currentPlayer;//upd front
}
//4
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    txtCont.textContent = `${currentPlayer}'s turn`;
}
//5
function checkWinner(){
    let wonGame = false;

    for(let i = 0; i < combinations.length; i++){
        if(cellsOptions[combinations[i][0]] == "" || cellsOptions[combinations[i][1]] == "" || cellsOptions[combinations[i][2]] == ""){
            continue;
        }
        if(cellsOptions[combinations[i][0]] == cellsOptions[combinations[i][1]] && cellsOptions[combinations[i][1]] == cellsOptions[combinations[i][2]]){
            const cells = document.getElementsByClassName('cell');

            let fatality = new Audio('audio/fatality.mp3');
            fatality.play();

            setTimeout(() => {
            cells[combinations[i][0]].classList.add('win-show');
            cells[combinations[i][1]].classList.add('win-show');
            cells[combinations[i][2]].classList.add('win-show');
              }, 500);
            wonGame = true;

           break;
        }
    }

    if(wonGame){
        txtCont.textContent = `${currentPlayer} wins!`;
        gamePlay = false;

        // score.push(`${currentPlayer}`);
        // gameScore.textContent = "";
        // for(let i = 0; i < score.length; i++){
        //     gameScore.textContent += `Round ${i+1} : ${score[i]} `;
        // }

        score.push(`${currentPlayer}`);
        displayScore();
    } else if(!cellsOptions.includes("")){
    // } else if(!(cellsOptions[combinations[i][0]] == cellsOptions[combinations[i][1]] && cellsOptions[combinations[i][1]] == cellsOptions[combinations[i][2]])){
        txtCont.textContent = `Draw!`;
        gamePlay = false;

        score.push(`Draw`);
        displayScore();
    } else{
        changePlayer();
    }
}

function displayScore(){
    gameScore.textContent = "";
    gameScore.setAttribute('style', 'white-space: pre;');
    for(let i = 0; i < score.length; i++){
        if(score[i] == "X" || score[i] == "O"){
            gameScore.textContent += `Round ${i+1}: ${score[i]} won \r\n`;
        } else {
        gameScore.textContent += `Round ${i+1}: ${score[i]} \r\n`;
        }
    }
}
//6.
function restartGame(){
    currentPlayer = "X";
    cellsOptions = ["", "", "", "", "", "", "", "", ""];
    txtCont.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.classList.remove("win-show"));
    gamePlay = true;

    location.reload();
}

function nextRoundGame(){
    //for(let i = 0; i < score.length; i++){
    //    alert(score[i]);
    //}
    let fight = new Audio('audio/fight.mp3');
    fight.play();

    currentPlayer = "X";
    cellsOptions = ["", "", "", "", "", "", "", "", ""];
    txtCont.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    cells.forEach(cell => cell.classList.remove("win-show"));
    gamePlay = true;

    wonGame++;
   // txtCont.textContent++;
   // gameScore.textContent++;
   
}