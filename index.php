<?php
session_start();
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: php/login.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Maths</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<div class="top-left"><?php echo htmlspecialchars($_SESSION["username"]); ?></div>
<div class="top-right">
    Score: <div id="score"></div>
</div>
<div class="container">
    <div class="item box">
        <div id="formula" class="item"></div>
        <div id="answer-div" class="item op">
            <input onkeypress="checkAnswer()"  id="answer" type="text" class="result" />
        </div>
        <div id="tick" class="item image">
            <img src="img/tick.png"/>
        </div>
        <div id="cross" class="item image">
            <img src="img/cross.png"/>
        </div>
    </div>
</div>
<div class="footer">
    <p>
        <a href="php/logout.php" class="btn btn-default">Sign Out</a>
    </p>
</div>
<script type="text/javascript" src="js/app.js"></script>
<script>
    document.getElementById("answer").focus();
    initStuff();
</script>
</body>
</html>