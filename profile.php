<?php
session_start();
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: php/login.php");
    exit;
}
$username = htmlspecialchars($_SESSION["username"]);
$display_name = htmlspecialchars($_SESSION["display_name"]);
$param_id = $_SESSION["id"];
if ($_SERVER["REQUEST_METHOD"] == "POST" && $param_id) {
    require_once "php/config.php";
    $sql = "UPDATE `users` SET `display_name` = ? WHERE `id` = ?";
    if($stmt = $mysqli->prepare($sql)){
        $stmt->bind_param("ss", $param_display_name, $param_id);
        $param_display_name = trim($_POST["display_name"]);
        if ($stmt->execute()) {
            $_SESSION["display_name"] = $param_display_name;
            $display_name = $param_display_name;
        }
        $stmt->close();
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Profile</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="js/app.js"></script>
    <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
<div class="container">
<div class="wrapper misty">
    <h2>Profile</h2>
    <div class="form-group">
        <label>Username:</label>
        <p class="profile-text"><?php echo htmlspecialchars($username); ?></p>
    </div>
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
        <div class="form-group">
            <label>Display Name</label>
            <input onchange="saveName(document.getElementById('display-name').value)" id="display-name" type="text" name="display_name" class="form-control" value="<?php echo htmlspecialchars($display_name); ?>">
        </div>
    </form>
    <form name="bgf" class="form-group">
        <label>Background</label><br>
        <select id="bg-select" onchange="saveBackground();">
            <option value="0">None</option>
            <option value="1">Autumn</option>
            <option value="2">Minecraft</option>
            <option value="3">Sunrise</option>
        </select>
    </form>
    <a class="btn bg-success" href="index.php">Back to the maths!</a>
</div>
</div>
<script>
    setBackground(<?php echo htmlspecialchars($_SESSION["background_image"]); ?>);
    document.getElementById('bg-select').options[<?php echo htmlspecialchars($_SESSION["background_image"]); ?>].selected = true;
    document.getElementsByTagName("BODY")[0].style.display = 'block';
</script>
</body>
</html>