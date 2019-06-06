<?php
	// takes in two parameters in json form:
	//	-username, which should be the username submitted in the login entry
	//	-password, which should be the username submitted in the login entry
	
	// returns:
	//	-user_id, which will be an int: whatever the user_id of the user is, if the username and password match any user in the database
	//	-error, which will be an int: 0 if the username and password match a user in the database, otherwise 1
	
	// collect input data
	$input = json_decode(file_get_contents('php://input'), true);
	
	// parse input data
	$username = $input["username"];
	$password = $input["password"];
	
	// try to connect to database
	$con = new mysqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	if ($con->connect_error)
	{
		sendError($con->connect_error);
		return;
	}
	
	// creates a query to get the user_id from the website of the user
	$sql = "SELECT user_id FROM Users WHERE name LIKE '" . $username . "' AND password LIKE '" . $password . "'";
	
	$result = $con->query($sql);
	
	// return no results error if no results found
	if ($result->num_rows < 1)
	{
		sendError(1);
		return;
	}
	
	
	
	
	
?>