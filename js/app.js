

function initStuff() {
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
    var el = document.getElementById("answer");
    el.onkeydown = function(e) {
        var order = e.which;
        console.log(order);
        if (order === 8 || order === 46 || order === 109 || order === 173) {
            return true;
        } else if (order === 13) {
            console.log("Enter");
            var operator = document.getElementById("operator").innerText;
            var operand1 = parseInt(document.getElementById("operand1").innerText);
            var operand2 = parseInt(document.getElementById("operand2").innerText);
            var answer   = parseInt(document.getElementById("answer").value);
            var result;
            switch (operator) {
                case "+":
                    console.log("Plus");
                    result = operand1 + operand2;
                    break;
                case "-":
                    console.log("Minus");
                    result = operand1 - operand2;
                    break;
                case "×":
                    console.log("Multiply");
                    result = operand1 * operand2;
                    break;
                case "÷":
                    console.log("Divide");
                    result = operand1 / operand2;
                    break;
            }
            console.log(answer, result);
            if (answer === result) {
                document.getElementById("tick").style.display = 'block';
                document.getElementById("cross").style.display = 'none';
                var score = parseInt(document.getElementById("score").innerText);
                document.getElementById("score").innerText = (score + 1) + "";
                setTimeout(initStuff, 1000);
            } else {
                document.getElementById("cross").style.display = 'block';
                document.getElementById("tick").style.display = 'none';
                setTimeout(function () {
                    document.getElementById("answer").value = "";
                    document.getElementById("cross").style.display = 'none';
                    }, 1000);
            }
        } else if ((order > 48 && order < 59) || (order > 95 && order < 106)) {
            console.log(order);
        } else {
            e.preventDefault();
            return false;
        }
        return true;
    }
}



// document.addEventListener('DOMContentLoaded', function() {
//     initStuff();
// }, false);


