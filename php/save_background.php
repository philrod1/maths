<?php
// Initialize the session
session_start();

// Check if the user is logged in
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    exit;
}

require_once "config.php";

$param_id = $_SESSION["id"];
$param_img = ($_GET['img']) ? ($_GET['img']) : 0;

if ($param_id) {

    $sql = "UPDATE users SET background = ? WHERE id = ?";

    if ($stmt = mysqli_prepare($mysqli, $sql)) {
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "ii", $param_img, $param_id);

        // Attempt to execute the prepared statement
        mysqli_stmt_execute($stmt);

        // Close statement
        mysqli_stmt_close($stmt);

        $_SESSION["background_image"] = $param_img;
    }

    // Close connection
    mysqli_close($mysqli);
}
?>