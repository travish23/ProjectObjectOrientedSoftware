<?php

   session_start();
   $_SESSION = array();

   $user_check = $_SESSION['login_user'];

   $ses_sql = mysqli_query($dataBase,"select username from users where username = '$user_check' ");

   $row = mysqli_fetch_array($ses_sql,MYSQLI_ASSOC);

   $login_session = $row['username'];

   if(!isset($_SESSION['login_user']))
   {
      header("location:login.php");
      die();
   }
?>
