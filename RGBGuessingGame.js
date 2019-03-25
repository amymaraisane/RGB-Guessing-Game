var colors = [];
var num = 6;
var pickedColor = ''
var squares = document.querySelectorAll('.square');
var displayTarget = document.getElementById('displayTarget');
var message = document.getElementById('message');
var header = document.querySelector('#header');
var newColors = document.getElementById('newColors');
var modeButton = document.getElementsByClassName('modeButton');
var easy = document.getElementById('easy');
var hard = document.getElementById('hard');
hard.classList.add('selected');
/* haven't found a way yet to nest this in any other place without affecting the functionality :) */

init ();

function init(){
    generateColors(num);
    randomIndex();
    checkGuess();
    modeSelect();
}

//assign random rgb values for num indexes of color array
function generateColors (num){
    for(var i=0; i<num; i++){
        var newColor = "rgb(" +findOneRBG()+ ", "  +findOneRBG()+ ", "  +findOneRBG()+ ")";
        colors[i] = newColor;
        //assign newColor to square
        squares[i].style.backgroundColor = newColor;
    }
}
function findOneRBG (){
    var max = 256;
    return Math.floor(Math.random()*max);
}

//choose random index
function randomIndex(){
    var chosenIndex = Math.floor(Math.random()*num);
    /*returns random number between 0-5. will never get 6 since we're using Math.floor*/
    pickedColor = colors[chosenIndex];
    displayTarget.textContent = pickedColor.toUpperCase();
    return pickedColor;
}


//checks whether correct color was picked on click
function checkGuess (){
    for(var i =0; i<squares.length; i++){
        squares[i].addEventListener('click', function(){
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor){
                message.textContent = 'Correct!';
                changeColors(pickedColor);
                newColors.textContent = 'Play Again?';
            } else{
                this.style.backgroundColor ='#232323';
                message.textContent = 'Try Again';
            }
        });
    }
}
//if correct, updates background color of all squares and header
function changeColors(color){
    for(var i =0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
        header.style.backgroundColor = color;
    }
}

//on Easy click event, reduce squares and colors to 3.  On Hard click event, use 6 squares and colors.
function modeSelect (){
    for (var i =0; i<modeButton.length; i++){
        modeButton[i].addEventListener('click', function (){
            /* if selecting for 1st time, restarts game*/ 
            var selectedClasses = this.classList;
            var isSelected = selectedClasses.contains('selected')
            if (!isSelected){
            /* finds correct number of squares to show */
                if (this === easy){
                    num = 3;
                    for(var i =3; i<squares.length; i++){
                        squares[i].style.display = "none";
                    }
                    //adds proper styling for easy/hard buttons
                    easy.classList.add('selected');
                    hard.classList.remove('selected');
                } else{
                    num = 6;
                    for(var i =3; i<squares.length; i++){
                        squares[i].style.display = "block";
                    }
                    hard.classList.add('selected');
                    easy.classList.remove('selected');
                }   
                newGame();
            }
        });
    }
}
//starts new game w/o reloading page
newColors.addEventListener('click', newGame);

function newGame (){
    init();
    header.style.backgroundColor = 'rgb(176, 66, 244)';
    message.textContent = '';
    newColors.textContent = 'New Colors';
}

//Functional Easy/Hard Button Code Before Refactoring:
// easy.addEventListener('click', function (){
//     var easyClasses = easy.classList;
//     var isSelected = easyClasses.contains('selected')
//     if (!isSelected){
//     /* refactor into one variable name to use boolean */
//         num = 3;
//         newGame();
//         toggleMode();
//         /* need (), review why */
//         for(var i =3; i<squares.length; i++){
//             squares[i].style.display = "none";
//         }
//     }
// });

// hard.addEventListener('click', function () {
//     var hardClasses = hard.classList;
//     var isSelected = hardClasses.contains('selected');
//     /*its ok that same variable name is used since both have local scope only */
//     if (!isSelected){    
//         num = 6;
//         newGame();
//         toggleMode();
//         for(var i =3; i<squares.length; i++){
//             squares[i].style.display = "block";
//         }
//     }
// });

// function toggleMode (){
//     hard.classList.toggle('selected');
//     easy.classList.toggle('selected');
// }