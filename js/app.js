var blockInput = true;

var score = 0;
var op1, op2;
var op;

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
    op = Math.floor(Math.random() * 4);

    if (op > 1) {
        op1 = Math.floor(Math.random() * 9) + 1;
        op2 = Math.floor(Math.random() * 9) + 1;
        if (op === 3) {
            op1 = op1 * op2;
        }
    } else {
        op1 = Math.floor(Math.random() * 19) + 1;
        op2 = Math.floor(Math.random() * 19) + 1;
    }

    document.getElementById("cross").style.display = 'none';
    document.getElementById("tick").style.display = 'none';
    document.getElementById("formula").innerText = op1 + operators[op] + op2 + "=";
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
            var result;
            switch (op) {
                case 0:
                    result = op1 + op2;
                    break;
                case 1:
                    result = op1 - op2;
                    break;
                case 2:
                    result = op1 * op2;
                    break;
                case 3:
                    result = op1 / op2;
                    break;
            }
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

function saveName(displayName) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "php/save_name.php?name=" + displayName, true);
    xmlhttp.send();
}


