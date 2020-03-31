<?php
session_start();

if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    exit;
}

require_once "config.php";

$param_id = $_SESSION["id"];

if ($param_id) {
    $query = "SELECT score from users WHERE id = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("i", $param_id);
    $stmt->execute();
    echo $stmt->get_result()->fetch_assoc()['score'];
    mysqli_close($mysqli);
}
?>