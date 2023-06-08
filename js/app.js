var blockInput = true;

var score = 0;
var x, y, z;
var op1, op2;

function initStuff() {
    blockInput = true;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            score = parseInt(xmlhttp.responseText);
            document.getElementById("score").innerText = score + "";
            document.getElementsByTagName("BODY")[0].style.display = 'block';
            document.getElementById("answer").focus();
        }
        blockInput = false;
    };
    xmlhttp.open("GET", "php/get_score.php", true);
    xmlhttp.send();
    var operators = ['+', '-', '×', '÷'];

    while (true) {
        op1 = Math.floor(Math.random() * 4);
        op2 = Math.floor(Math.random() * 4);
        x = Math.floor(Math.random() * 19) + 1;
        y = Math.floor(Math.random() * 19) + 1;
        z = Math.floor(Math.random() * 19) + 1;
        if (checkResult(op1, op2, x, y, z)) break;
    }
    

    if (op1 === 3) {
        x = x * y;
    }

    if (op2 === 3) {
        y = y * z;
    }

    document.getElementById("cross").style.display = 'none';
    document.getElementById("tick").style.display = 'none';
    document.getElementById("formula").innerText = x + operators[op1] + y + operators[op2] + z + "=";
    document.getElementById("answer").value = "";
}

function saveBackground() {
    var sel = document.getElementById('bg-select');
    var index = parseInt(sel.value);
    setBackground(index);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/save_background.php?img=" + index, true);
    xmlhttp.send();
}

function setBackground(index) {
    switch (index) {
        case 1:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = "url('img/autumn.jpg')";
            break;
        case 2:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = "url('img/minecraft.jpg')";
            break;
        case 3:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = "url('img/sunrise.jpg')";
            break;
        case 4:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = "url('img/roblox.jpg')";
            break;
        case 5:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = "url('img/bee_swarm.jpg')";
            break;
        default:
            document.getElementsByTagName("HTML")[0].style.backgroundImage = 'none';
    }

}

function checkAnswer() {
    if (blockInput) {
        return;
    }
    var el = document.getElementById("answer");
    el.onkeydown = function(e) {
        if (blockInput) {
            e.preventDefault();
            return false;
        }
        var key = e.which;
        if (key === 8 || key === 46 || key === 109 || key === 173 || key === 189
            || (key > 47 && key < 59) || (key > 95 && key < 106)) {
            return true;
        } else if (key === 13) {
            var answer = parseInt(document.getElementById("answer").value);
            var result = calculateFullResult(op1, op2, x, y, z);
            if (answer === result) {
                blockInput = true;
                score++;
                document.getElementById("tick").style.display = 'block';
                document.getElementById("cross").style.display = 'none';
                document.getElementById("score").innerText = score + "";
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("GET", "php/increment_score.php", true);
                xmlhttp.send();
                setTimeout(function() {
                    initStuff();
                    }, 1000);
            } else {
                document.getElementById("cross").style.display = 'block';
                document.getElementById("tick").style.display = 'none';
                setTimeout(function () {
                    document.getElementById("answer").value = "";
                    document.getElementById("cross").style.display = 'none';
                    }, 1000);
            }
        } else {
            e.preventDefault();
            return false;
        }
        return true;
    }
}

function checkResult(op1, op2, x, y, z) {
    if (!Number.isInteger(calculateResult(op1, x, y))) return false;
    if (!Number.isInteger(calculateResult(op2, y, z))) return false;
    if (!Number.isInteger(calculateFullResult(op1, op2, x, y, z))) return false;
    return true;
}

function calculateFullResult(op1, op2, x, y, z) {
    if (op2 > 1 && op1 < 2) {
        return calculateResult(op1, x, calculateResult(op2, y, z));
    } else {
        return calculateResult(op2, calculateResult(op1, x, y), z);
    }
}

function calculateResult(operator, x, y) {
    const ops = [
        (x, y) => x + y,
        (x, y) => x - y,
        (x, y) => x * y,
        (x, y) => x / y
    ]
    return ops[operator](x,y);
}

function saveName(displayName) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/save_name.php?name=" + displayName, true);
    xmlhttp.send();
}


