<?php
// Connects to your Database -- need to change db name and logic
 //mysql_connect("localhost", "luua4y2c74pm", "@Contact4331") or die(mysql_error()); 
 //mysql_select_db("Cop4331Project1") or die(mysql_error()); 
 
$inData = getRequestInfo();

//$mode = $inData["mode"];
// $name = $inData["name"];
// $phone = $inData["phone"];
// $email = $inData["email"];
// $address = $inData["address"];
// $contact_id = $inData["contact_id"];
//$self = $_SERVER['PHP_SELF'];

	//$color = $inData["color"];
	// $userId = $inData["ID"];



	$conn = new sqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	//$user = 'root';
	//$password = 'root';
	//$db = 'Contacts';
	//$host = 'localhost';
	//$port = 8889;

	//$link = mysqli_init();
	//$conn = mysqli_real_connect(
   	//	$link,
   	//	$host,
   	//	$user,
   	//	$password,
   	//	$db,
   	//	$port
	//);

	//$conn = new mysqli("localhost", "root", "root", "mysql");
	//echo "Hello!";
	
	echo "recieved id is ";
	echo $inData;
	
	
	if ($conn->connect_error) 
	{
		//echo "Hello2";
		returnWithError( $conn->connect_error );
	} 
	else
	{
		//echo "Hello3";
		//$sql = "insert into Contacts (contact_id,name) VALUES (" . $contact_id . ",'" . $name . "')";

		$sql = "delete * from Contacts WHERE contact_id='" . $inData . "'";
		
		// if( $result = $conn->query($sql) != TRUE )
		// {
			// returnWithError( $conn->error );
		// }
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		// echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>