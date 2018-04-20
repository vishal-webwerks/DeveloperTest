

var turn = 'X';
var score = {
    'X': 0,
    'O': 0
};
var gridValue = 0;

function plotGrid() {
    var select = document.getElementById("grid");
    for (i = 3; i <= 100; i += 1) {
        var option = document.createElement('option');
        select.options[select.options.length] = new Option(i + ' X ' + i, i);
    }

    addEvent(document.getElementById("game"), "click", playwithcomputer);

    plotNewGame();
}

function addEvent(element, eventName, callback) {

    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}



function getRandomNumber (){

    return (Math.random() *gridValue).toFixed(0);
}

function plotNumber(currentBlockIndex,currentObj){


    var newIndex = getRandomNumber();

    if(newIndex==0){
        newIndex = getRandomNumber();
    }

    if(currentBlockIndex != newIndex){


        var computerId = (currentObj[0] + currentObj[1] + newIndex);
        var _targetElement = document.getElementById(computerId);

        if(_targetElement.innerHTML == "" && _targetElement.innerHTML !=null){
            score['O'] += 1;
            _targetElement.innerHTML= "O";
            _targetElement.classList.add('disabled');
            _targetElement.classList.add("O");

        }

        else{

            plotNumber(currentBlockIndex,currentObj);
        }
    }
    else if(currentBlockIndex == newIndex){
        plotNumber(currentBlockIndex,currentObj);
    }

}

function playwithcomputer(e) {
    if (e.target && e.target.nodeName == "TD") {
        var targetElement = document.getElementById(e.target.id);
        var currentLi = e.target.id;
        var currentObj = currentLi.split("");
        var currentBlockIndex =currentObj[currentLi.length -1];
        plotNumber(currentBlockIndex,currentObj);
        var prevTurn;
        if ((targetElement.className).indexOf("disabled") == -1) {

            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);
            score[turn] += 1;
            prevTurn = turn;

            turn = "X";

           // turn = turn === "X" ? "O" : "X";

            if (checkWin(targetElement, prevTurn)) {
                alert(prevTurn + ' has won the game');
                plotNewGame();

            } else if ((score['X'] + score['O']) == (gridValue * gridValue)) {
                alert('Draw!');
                plotNewGame();
            }
        }
    }
}

function checkWin(targetElement, prevTurn) {
    var UL = document.getElementById('game');
    var elements, i, j, cnt;
    if (score[prevTurn] >= gridValue) {
        var classes = targetElement.className.split(/\s+/);
        for (i = 0; i < classes.length; i += 1) {
            cnt = 0;
            if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
                elements = UL.getElementsByClassName(classes[i]);
                for (j = 0; j < elements.length; j += 1) {
                    if (elements[j].innerHTML == prevTurn) {
                        cnt += 1;
                    }
                }
                if (cnt == gridValue) {
                    return true;
                }
            }
        }
    }
    return false;
}

function plotNewGame() {
    var gameUL = document.getElementById("game");
    if (gameUL.innerHTML !== '') {
        gameUL.innerHTML = null;
        score = {
            'X': 0,
            'O': 0
        };
        turn = 'X';
        gridValue = 0;
    }
    var select = document.getElementById("grid");
    gridValue = select.options[select.selectedIndex].value;
    var i, j, li, k = 0,
        classLists;
    var gridAdd = +gridValue + 1;

    for (i = 1; i <= gridValue; i += 1) {
        tr = document.createElement('tr');
        for (j = 1; j <= gridValue; j += 1) {
            k += 1;
            li = document.createElement('td');
            li.setAttribute("id", 'li' + k);

            classLists = 'td row' + i + ' col' + j;

            if (i === j) {
                classLists = 'td row' + i + ' col' + j + ' dia0';
            }

            if ((i + j) === gridAdd) {
                classLists = 'td row' + i + ' col' + j + ' dia1';
            }

            if (!checkWin(gridValue) && (Math.round(gridValue / 2) === i && Math.round(gridValue / 2) === j))
                classLists = 'td row' + i + ' col' + j + ' dia0 dia1';

            li.className = classLists;
            tr.appendChild(li);

        }
        gameUL.appendChild(tr);
    }
}


function checkWin(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}