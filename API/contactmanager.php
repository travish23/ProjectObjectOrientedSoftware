<?php
    include("config.php");
    session_start();
    $input = file_get_contents('php://input');
    $_SESSION['user_id'] = $input;

    if(!isset($_SESSION['login_user']))
    {
        header("location: ../HTML/userContactsPage.html");
        die();
    }
    if(!isset($_SESSION['searchFlag']))
    {
        $_SESSION['searchFlag'] = false;
    }
?>
