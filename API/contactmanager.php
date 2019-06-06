<?php
    include("config.php");
    session_start();
    $user_check = $_SESSION['login_user'];
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
