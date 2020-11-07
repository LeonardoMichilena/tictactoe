//Game field array 
let fields;
let winFields;
// Current player (X or O), X always plays first
let currentPlayer;
//Everytime a player fills a shape
let movesCount = 0;
//Players Win counter
let xWinsCount = 0;
let oWinsCount = 0;

// Add and remove classes by ID
function addClass(iden,className) {
    document.getElementById(iden).classList.add(className);
}
function removeClass(iden,className) {
    document.getElementById(iden).classList.remove(className);
}

//Shows whose turn is it by decreasing opacity from the other player
function showTurn() {
    if (currentPlayer == "X") {
        addClass('circle',"player-no-turn");
        removeClass('cross',"player-no-turn");

    } else {
        addClass('cross',"player-no-turn");
        removeClass('circle',"player-no-turn");
    }
}

//Start the game when pressing Start button or after the finish screen
function startGame() {
    fields = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    currentPlayer = "X";
    showTurn();
    //Clean the game fields when re-starting and set moves counter to 0
    if (movesCount != 0) {
        for (i = 0; i < 9; i++) {
            document.getElementById(i).innerHTML = "";
        }
        movesCount = 0;
    }
    //Show main game container and hide start/finish buttons
    addClass("btn-finish","d-none");
    addClass("btn-start","d-none");
    removeClass("main-game","d-none");
    removeClass("main-game","main-game-block");

}
// Fill fields with the player's shape (X or O) anternately
function fillShape(id) {
    //only fill shape if the field is null & change current player
    if (!fields[id]) {
        movesCount++;
        fields[id] = currentPlayer;
        if (currentPlayer == "X") {
            document.getElementById(id).innerHTML = "<div><img src='./img/cross.png'></div>";
            currentPlayer = "O";
            showTurn();
        } else {
            document.getElementById(id).innerHTML = "<div><img src='./img/circle.png'></div>";
            currentPlayer = "X";
            showTurn();
        }
        //Check for Winner only after 4 moves
        if (movesCount > 4) { 
            checkWinner();
        }
    }
}
function checkWinner() {
    // Array with the 8 posible win combinations of each 3 positions, in order (0,1,2 & 3,4,5 & 6,7,8 & etc).
    let combis = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6];
    //Check if every 3 positions in the array are all equal and diferent from zero in order to win
    for (i = 0; i < 23; i = i + 3) {
        if (fields[combis[i]] == fields[combis[i + 1]] && fields[combis[i + 1]] == fields[combis[i + 2]] && fields[combis[i]] != 0) {
            //Collect current win combination in an array and the winner shape
            winFields = [combis[i],combis[i+1],combis[i+2]];
            winner = fields[combis[i]];
            finishGame();
            break;
        } else if (movesCount == 9) {
            winner = "Nobody";
           finishGame();
        }
    }
}
// Finish game, show winner and add win to player's win counter
function finishGame() {
    if(winner == "X"){
        xWinsCount++;
        drawLine();
        document.getElementById("btn-finish").innerHTML = `Winner: ${winner} <br><br>PLAY AGAIN!`;
    }
    else if (winner == "O") {
        oWinsCount++;
        drawLine();
        document.getElementById("btn-finish").innerHTML = `Winner: ${winner} <br><br>PLAY AGAIN!`;
    } else  document.getElementById("btn-finish").innerHTML = `Draw! <br>PLAY AGAIN!`;
    addClass("main-game","main-game-block");
    setTimeout(function(){
        removeClass("btn-finish","d-none");
        document.getElementById("cross").innerHTML = `<div><img src="./img/cross.png">${xWinsCount}</div>`;
        document.getElementById("circle").innerHTML = `<div><img src="./img/circle.png">${oWinsCount}</div>`;
    },1000);
}
function drawLine (){
    //Add div with a line and class "line-horizontal" for all the possible horizontal wins
    if((winFields[0] == 0 && winFields[2]== 2)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div id='line' class='line-horizontal'></div>");
    } 
    else if ((winFields[0] == 3 && winFields[2]== 5)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-horizontal' style='top:50%;'></div>");
    } 
    else if (winFields[0] == 6 && winFields[2]== 8){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-horizontal' style='top:85%;'></div>");
    }
    //Add div with a line and class "line-vertical" for all the possible vertical wins
    else if((winFields[0] == 0 && winFields[2] == 6)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-vertical' style='height: 100%;'></div>");
    } else if ((winFields[0] == 1 && winFields[2] == 7) ){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-vertical' style='left:50%;'></div>");
    } else if ((winFields[0] == 2 && winFields[2] == 8)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-vertical' style='left:85%;'></div>");
    }
     //Add div with a line and class "line-diagonal-one" for the diagonal "\" wins
     else if((winFields[0] == 0 && winFields[2] == 8)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-diagonal-one'></div>");
    }
     //Add div with a line and class "line-diagonal-two" for the diagonal "/" wins
     else if((winFields[0] == 2 && winFields[2] == 6)){
        document.getElementById(winFields[0]).insertAdjacentHTML('beforeend',"<div class='line-diagonal-two'></div>");
    }
}

