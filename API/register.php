<?php

	session_start();
	$_SESSION = array();
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$username = $_POST['username'];
		$password = $_POST['password']; 
		$email = $_POST['email']
		$authpassword = $_POST['password_confirm'];
		
		if($password != $authpassword)
		{
			echo "<script>";
			echo 'alert("Passwords do not match");';
			echo 'location = "index.html"';
			echo "</script>";
			exit();
		}
		
		$con = new sqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
		
		if (mysqli_connect_errno($conn))
		{
			echo("Failed to connect to MySQL: " . mysqli_connect_error($conn));
		}
		
		else
		{
			$hashed_password = password_hash($password, PASSWORD_DEFAULT);
			
			$stmt = $conn->prepare("INSERT INTO Users (Username,Password) VALUES (?, ?)");
			
			$stmt->bind_param("ss", $username, $hashed_password);
			
			if($stmt->execute())
			{
				echo "<script>";
				echo 'alert("Successful Sign Up!");';
				echo 'location = "index.html"';
				echo "</script>";
			}
			
			else
			{
				echo "<script>";
				echo 'alert("Username taken, please choose another");';
				echo 'location = "index.html"';
				echo "</script>";
			}
			
			$stmt->close();
			$conn->close();
		}
	}
	
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>
