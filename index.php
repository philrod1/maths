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
    <script type="text/javascript" src="js/app.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/all.css">
</head>
<body>
<div class="head misty">
    <div class="top-left username" onclick="window.location='profile.php';"><?php echo htmlspecialchars($_SESSION["display_name"]); ?></div>
    <div class="top-right">
        Score: <div id="score"></div>
    </div>
</div>
<div class="container">
    <div class="item box">
        <div id="formula" class="item"></div>
        <div id="answer-div" class="item op">
            <input onkeypress="checkAnswer()"  id="answer" type="number" class="result" />
        </div>
        <div id="tick" class="item image">
            <img src="img/tick.png"/>
        </div>
        <div id="cross" class="item image">
            <img src="img/cross.png"/>
        </div>
    </div>
</div>
<div class="footer misty">
    <p>
        <a href="php/logout.php" class="btn btn-default">Sign Out</a>
        <a href="profile.php" class="btn btn-default pull-right">Profile</a>
    </p>
</div>
<script>
    setBackground(<?php echo htmlspecialchars($_SESSION["background_image"]); ?>)
    document.getElementById("answer").focus();
    initStuff();
</script>
</body>
</html>