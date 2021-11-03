// Disclamer 
console.log(`%cAll rights reserved | Any illegal reproduction of this content will result in immediate legal action.
© 2021 Bhanu Pratap Singh Rathore`,"color:red; font-weight: bold; font-size: 1.0rem; background: yellow");


// name
let user;
user = prompt("Enter Your Name", "Guest");
user = user.trim();

if (user.length > 12){        // Name length
    user = user.substring(0,12);
    user = user.substring(0,user.lastIndexOf(" "));
}     
document.getElementById("name").innerHTML = "Hello, " + user.toUpperCase();

// clock
let temp;
function gettime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let ex = 'AM'
    if (h > 12) {
        h = h - 12;
        ex = 'PM'
    }
    if (h < 10) {
        h = '0' + h;
    }
    if (m < 10) {
        m = '0' + m;
    }

    if (temp != m) {
        document.getElementById("time").innerHTML = `Time : ${h}:${m} ${ex}`;
    }
    temp = m;     // Clock update
}
setInterval(gettime, 1000);

// Score Board

let total = 0;
let user_score = 0;
let comp_score = 0;
let draw = 0;

function score() {
    document.getElementById("total").innerHTML = "Number Of Matches : " + total;
    document.getElementById("user").innerHTML = "Number Of Wins : " + user_score;
    document.getElementById("loses").innerHTML = "Number Of Loses : " + comp_score;
    document.getElementById("draw").innerHTML = "Number Of Draws : " + draw;

    let temp;
    if (user_score > comp_score) {
        temp = user;
    }
    else if (user_score < comp_score) {
        temp = "Computer";
    }
    else {
        temp = "No One <_>";
    }
    document.getElementById("win").innerHTML = temp;

}

// Game Board

let proto = '';
let input = new Array(3);
for (let i = 0; i < 3; i++) {
    input[i] = new Array(3);
}
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        input[i][j] = '-';
    }
}


function reset() {
    let dom = document.getElementById("matrix");

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            input[i][j] = '-';
        }
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            proto = proto.concat(`<span id="input[${i}][${j}]" onclick="user_input(${i},${j})">-</span>\n`);
        }
    }
    dom.innerHTML = proto;
    proto = '';
}

function full_reset(i = 0) {
    if (i == 0) {
        let flag = confirm("Do you really want's to RESET the game?");
        if (flag == false) {
            return 0;
        }
    }
    total = 0;
    user_score = 0;
    comp_score = 0;
    draw = 0;
    reset();
    score();
}

function generateRandom(min = 1, max = 9) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor(rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

function check() {
    // user check
    if (input[0][0] == 'X' && input[0][1] == 'X' && input[0][2] == 'X' ||
        input[1][0] == 'X' && input[1][1] == 'X' && input[1][2] == 'X' ||
        input[2][0] == 'X' && input[2][1] == 'X' && input[2][2] == 'X') {
        // user win and Row Check
        user_score++;
        total++;
        return 0;
    }
    else if (input[0][0] == 'X' && input[1][0] == 'X' && input[2][0] == 'X' ||
        input[0][1] == 'X' && input[1][1] == 'X' && input[2][1] == 'X' ||
        input[0][2] == 'X' && input[1][2] == 'X' && input[2][2] == 'X') {
        // user win and column Check
        user_score++;
        total++;
        return 0;
    }
    else if (input[0][0] == 'X' && input[1][1] == 'X' && input[2][2] == 'X' ||
        input[0][2] == 'X' && input[1][1] == 'X' && input[2][0] == 'X') {
        // user win and diagonals Check
        user_score++;
        total++;
        return 0;
    }
    // comp check
    else if (input[0][0] == '0' && input[0][1] == '0' && input[0][2] == '0' ||
        input[1][0] == '0' && input[1][1] == '0' && input[1][2] == '0' ||
        input[2][0] == '0' && input[2][1] == '0' && input[2][2] == '0') {
        // comp win and Row Check
        comp_score++;
        total++;
        return 0;
    }
    else if (input[0][0] == '0' && input[1][0] == '0' && input[2][0] == '0' ||
        input[0][1] == '0' && input[1][1] == '0' && input[2][1] == '0' ||
        input[0][2] == '0' && input[1][2] == '0' && input[2][2] == '0') {
        // comp win and column Check
        comp_score++;
        total++;
        return 0;
    }
    else if (input[0][0] == '0' && input[1][1] == '0' && input[2][2] == '0' ||
        input[0][2] == '0' && input[1][1] == '0' && input[2][0] == '0') {
        // comp win and diagonals Check
        comp_score++;
        total++;
        return 0;
    }
    else    // check whether match draw or not :..
    {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (input[i][j] == '-') {
                    return 1;
                }
            }
        }
        total++;
        draw++;
        return 2;
    }
}

function comp_input() {
    let dom = document.getElementById("matrix");
    let num;

    while (true) {
        num = generateRandom();
        switch (num) {
            case 1:
                i = 0, j = 0;
                break;
            case 2:
                i = 0, j = 1;
                break;
            case 3:
                i = 0, j = 2;
                break;
            case 4:
                i = 1, j = 0;
                break;
            case 5:
                i = 1, j = 1;
                break;
            case 6:
                i = 1, j = 2;
                break;
            case 7:
                i = 2, j = 0;
                break;
            case 8:
                i = 2, j = 1;
                break;
            case 9:
                i = 2, j = 2;
                break;
            default:
                break;
        }

        if (input[i][j] == '-') {
            input[i][j] = '0';
            break;
        }
        else {
            continue;
        }
    }

    let temp = check();
    if (temp == 1) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (input[i][j] == 'X') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">X</span>\n`);
                }
                else if (input[i][j] == '0') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">0</span>\n`);
                }
                else {
                    proto = proto.concat(`<span id="input[${i}][${j}]" onclick="user_input(${i},${j})">-</span>\n`);
                }
            }
        }
        dom.innerHTML = proto;
        proto = '';
        score();
    }
    else if (temp == 2) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (input[i][j] == 'X') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">X</span>\n`);
                }
                else if (input[i][j] == '0') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">0</span>\n`);
                }
                else {
                    proto = proto.concat(`<span id="input[${i}][${j}]">-</span>\n`);
                }
            }
        }

        dom.innerHTML = proto;
        proto = '';
        score();
    }
    else {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (input[i][j] == 'X') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">X</span>\n`);
                }
                else if (input[i][j] == '0') {
                    proto = proto.concat(`<span id="input[${i}][${j}]">0</span>\n`);
                }
                else {
                    proto = proto.concat(`<span id="input[${i}][${j}]">-</span>\n`);
                }
            }
        }

        dom.innerHTML = proto;
        proto = '';
        score();
    }
}

function user_input(a, b) {
    let dom = document.getElementById("matrix");

    input[a][b] = 'X';

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (input[i][j] == 'X') {
                proto = proto.concat(`<span id="input[${i}][${j}]">X</span>\n`);
            }
            else if (input[i][j] == '0') {
                proto = proto.concat(`<span id="input[${i}][${j}]">0</span>\n`);
            }
            else {
                proto = proto.concat(`<span id="input[${i}][${j}]">-</span>\n`);
            }
        }
    }

    dom.innerHTML = proto;
    proto = '';

    let temp = check();
    if (temp == 1) {
        comp_input();
    }
    else if (temp == 2) {
        score();
    }
    else {
        score();
    }

}

full_reset(1);

