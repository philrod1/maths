<?php
define('DB_SERVER', '127.0.0.1');
define('DB_USERNAME', 'school');
define('DB_PASSWORD', 'fake-password');
define('DB_NAME', 'school');

$mysqli = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if($mysqli === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>