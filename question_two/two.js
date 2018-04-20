
var currentValue = 0;
var scoreValue = {
    'X': 0,
    'O': 0
};
var turn = 'X';



function plotGrid() {
    var select = document.getElementById("grid");
    for (i = 3; i <= 100; i += 1) {
        var option = document.createElement('option');
        select.options[select.options.length] = new Option(i + ' X ' + i, i);
    }

    addEvent(document.getElementById("game"), "click", playGame);

    plotNewGame();
}

function addEvent(element, eventName, callback) {

    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    }
}

function playGame(e) {
    if (e.target && e.target.nodeName == "TD") {
        var targetElement = document.getElementById(e.target.id);
        var prevturn;
        if ((targetElement.className).indexOf("disabled") == -1) {
            targetElement.innerHTML = turn;
            targetElement.classList.add('disabled');
            targetElement.classList.add(turn);
            scoreValue[turn] += 1;
            prevturn = turn;
            turn = turn === "X" ? "O" : "X";
            if (checkWinner(targetElement, prevturn)) {
                alert(prevturn + ' has won the game');
                plotNewGame();
            } else if ((scoreValue['X'] + scoreValue['O']) == (currentValue * currentValue)) {
                alert('Draw!');
                plotNewGame();
            }
        }
    }
}

function checkWinner(targetElement, prevturn) {
    var UL = document.getElementById('game');
    var elements, i, j, cnt;
    if (scoreValue[prevturn] >= currentValue) {
        var classes = targetElement.className.split(/\s+/);
        for (i = 0; i < classes.length; i += 1) {
            cnt = 0;
            if (classes[i].indexOf('row') !== -1 || classes[i].indexOf('col') !== -1 || classes[i].indexOf('dia') !== -1) {
                elements = UL.getElementsByClassName(classes[i]);
                for (j = 0; j < elements.length; j += 1) {
                    if (elements[j].innerHTML == prevturn) {
                        cnt += 1;
                    }
                }
                if (cnt == currentValue) {
                    return true;
                }
            }
        }
    }
    return false;
}


function checkWin(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}

function plotNewGame() {
    var gameUL = document.getElementById("game");
    if (gameUL.innerHTML !== '') {
        gameUL.innerHTML = null;
        scoreValue = {
            'X': 0,
            'O': 0
        };
        turn = 'X';
        currentValue = 0;
    }
    var select = document.getElementById("grid");
    currentValue = select.options[select.selectedIndex].value;
    var i, j, li, k = 0,
        classLists;
    var gridAdd = +currentValue + 1;

    for (i = 1; i <= currentValue; i += 1) {
        tr = document.createElement('tr');
        for (j = 1; j <= currentValue; j += 1) {
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

            if (!checkWin(currentValue) && (Math.round(currentValue / 2) === i && Math.round(currentValue / 2) === j))
                classLists = 'td row' + i + ' col' + j + ' dia0 dia1';

            li.className = classLists;
            tr.appendChild(li);

        }
        gameUL.appendChild(tr);
    }
}

