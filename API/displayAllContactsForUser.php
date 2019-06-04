<?php
	// this script takes in one parrameter in json form:
	// 	-ID, 	which should be the userID of the user who is currently signed in
	
	// this script will return a json in the format of {"results":"", "error":""} 
	// and results will be in a 2d array of contacts(rows) with columns: contact_id, name, email, phone, address
	
	// collect input data
	$input = json_decode(file_get_contents('php://input'), true);
	
	// parse input data
	$userID = $input["ID"];

	// initialize result variables
	$searchResults = array();
	$contact = array();
	
	// try to connect to database
	$con = new sqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	if ($con->connect_error)
	{
		sendError($con->connect_error);
		return;
	}
	
	// creates a query to collect all the contact entries for the current user that contain "searchQuery"
	$sql = "SELECT contact_id, name, email, phone, address FROM Contacts WHERE ID = '" . $userID . "'";
	
	$result = $con->query($sql);
	
	// return no results error if no results found
	if ($result->num_rows < 1)
	{
		sendError("No results");
		return;
	}
	
	// loop through the hits
	while($row = $result->fetch_assoc())
	{
		// add each element of the contact result
		$contact[] = $row["contact_id"];
		$contact[] = $row["name"];
		$contact[] = $row["email"];
		$contact[] = $row["phone"];
		$contact[] = $row["address"];
		
		// adds completed contact to searchResults array
		$searchResults[] = $contact;
	}
	
	// sends the 2d searchResults array
	sendInfo($searchResults);
	return;
	
	

	// sends a json to what called this script
	function returnJson($json)
	{
		header('Content-type: application/json');
		echo $json;
	}

	// format a json to return an error
	function sendError($error)
	{
		returnJson('{"results":"", "error":"' . $error . '"}');
	}

	// format a json to return searchResults
	function sendInfo($searchResults)
	{
		returnJson('{"results":[' . json_encode($searchResults) . '], "error":""}');
	}
?>