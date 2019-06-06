<?php
	// takes in two parameters in json form:
	//	-username, which should be the username submitted in the login entry
	//	-password, which should be the username submitted in the login entry
	
	// returns:
	//	-user_id, which will be an int: whatever the user_id of the user is, if the username and password match any user in the database
	//	-error, which will be an int: 0 if the username and password match a user in the database, otherwise 1
	
	
	echo file_get_contents('php://input');
	
	// collect input data
	$input = json_decode(file_get_contents('php://input'), true);
	
	
	// parse input data
	$username = $input["username"];
	$password = $input["psw"];
	
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
		echo "in error";
		sendError(1);
		return;
	}
	
	$row = $result->fetch_assoc();
	
	$user_id = $row["user_id"];
	
	echo "user_id is ";
	echo $user_id;
	
	// sends a json to what called this script
	function returnJson($json)
	{
		echo $json;
	}

	// format a json to return an error
	function sendError($error)
	{
		returnJson('{"user_id":"", "error":"' . $error . '"}');
	}

	// format a json to return searchResults
	function sendInfo($searchResults)
	{
		returnJson('{"user_id":"' . $searchResults . '", "error":""}');
	}
	
?>