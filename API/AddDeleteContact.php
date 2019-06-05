<?php

// Connects to your Database
 	$link = new sqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");


 if ($link->connect_error)
 {
   sendError($link->connect_error);
   return;
 }

 //colecting input data
  $input = json_decode(file_get_contents('php://input'), true);

//declaring contact details
$name = $_GET['name'];
$phone = $_GET['phone'];
$email = $_GET['email'];
$address = $_GET['address'];
$id = $_GET['id'];
$self = $_SERVER['PHP_SELF'];


if ( $mode=="added")
{
$sql = ("INSERT INTO address (name, phone, email, address) VALUES ('$name', '$phone', '$email', '$address')");
}


if ( $mode == "delete")
{
    $sql = ("DELETE FROM address where id=$id");
}
$link->close();
?>
