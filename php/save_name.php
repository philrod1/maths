<?php
// Initialize the session
session_start();

// Check if the user is logged in
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    exit;
}

require_once "config.php";

$param_id = $_SESSION["id"];
$param_name = ($_GET['name']) ? ($_GET['name']) : 0;

if ($param_id && $param_name) {

    $sql = "UPDATE users SET display_name = ? WHERE id = ?";

    if ($stmt = mysqli_prepare($mysqli, $sql)) {
        mysqli_stmt_bind_param($stmt, "si", $param_name, $param_id);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        $_SESSION["display_name"] = $param_name;
    }
    mysqli_close($mysqli);
}
?>