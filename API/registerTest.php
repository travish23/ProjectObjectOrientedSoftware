<?php

	// collect input data
	$input = json_decode(file_get_contents('php://input'), true);
	
	// parse input data
	$user = $input["username"];
	$pass = $input["password"];
	
	$con = new sqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	if ($con->connect_error)
	{
		sendError($con->connect_error);
		return;
	}
	
	$sql = "INSERT INTO Users (name, password) VALUES ('$user', pass";
	
	$result = $con->query($sql);

?>
