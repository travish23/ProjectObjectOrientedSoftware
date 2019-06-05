<?php

	// takes in 2 parameters in json format:
	//	-username, which is the username the user provides in the register form
	//	-password, which is the password the user provides in the register form
	
	// returns 1 if successful, returns 0 if failed.
	// failure should mean that the username is already taken.

	// collect input data
	$input = json_decode(file_get_contents('php://input'), true);
	
	// parse input data
	$user = $input["username"];
	$pass = $input["password"];
	
	$con = new mysqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	if ($con->connect_error)
	{
		sendError($con->connect_error);
		return;
	}
	
	$sql = "INSERT INTO Users (name, password) VALUES ('" . $user . "', '" . $pass . "')";
	
	if ($con->query($sql) === TRUE)
	{
        echo "1";
	    
	} 
	else 
	{
        echo "0";
    }

?>