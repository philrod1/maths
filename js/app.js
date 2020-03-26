var blockInput = false;

function initStuff() {
    blockInput = false;
    var operators = ['+', '-', '×', '÷'];
    var i = Math.floor(Math.random() * 4);
    var op1, op2;
    if (i > 1) {
        op1 = Math.floor(Math.random() * 9) + 1;
        op2 = Math.floor(Math.random() * 9) + 1;
        if (i === 3) {
            op1 = op1 * op2;
        }
    } else {
        op1 = Math.floor(Math.random() * 19) + 1;
        op2 = Math.floor(Math.random() * 19) + 1;
    }

    document.getElementById("cross").style.display = 'none';
    document.getElementById("tick").style.display = 'none';
    document.getElementById("operand1").innerText = op1 + "";
    document.getElementById("operator").innerText = operators[i];
    document.getElementById("operand2").innerText = op2 + "";
    document.getElementById("answer").value = "";
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
        console.log(key);
        if (key === 8 || key === 46 || key === 109 || key === 173
            || (key > 48 && key < 59) || (key > 95 && key < 106)) {
            return true;
        } else if (key === 13) {
            var operator = document.getElementById("operator").innerText;
            var operand1 = parseInt(document.getElementById("operand1").innerText);
            var operand2 = parseInt(document.getElementById("operand2").innerText);
            var answer   = parseInt(document.getElementById("answer").value);
            var result;
            switch (operator) {
                case "+":
                    result = operand1 + operand2;
                    break;
                case "-":
                    result = operand1 - operand2;
                    break;
                case "×":
                    result = operand1 * operand2;
                    break;
                case "÷":
                    result = operand1 / operand2;
                    break;
            }
            if (answer === result) {
                blockInput = true;
                document.getElementById("tick").style.display = 'block';
                document.getElementById("cross").style.display = 'none';
                var score = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = (score + 1) + "";
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


