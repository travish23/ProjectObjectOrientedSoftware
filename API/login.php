<?php
	session_start();
	$_SESSION = array();
	$obj = json_decode(file_get_contents('php://input'));
    //var_dump(obj);
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{

		$usernameEntry = $obj["username"];
		$passwordEntry = $obj["password"];

		$con = new mysqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");

		// Bad Connection to the DB
		if(mysqli_connect_errno($conn))
		{
			echo("Failed to connect to MySQL: " . mysqli_connect_error($conn));
		}
		// Successful connection to DB
		else
		{


			$sql = ("SELECT * from Users where name = '$usernameEntry' and password = '$passwordEntry'");
			$row = mysql_fetch_array($sql);

			if($row['username']==$usernameEntry && $row['password'] == $passwordEntry){

				echo("Login success");
			}
			else{
				echo("Failed login");

			}

			//$stmt = $conn->prepare("SELECT name, password FROM Users WHERE name = ?");

			//$stmt->bind_param("s", $usernameEntry);

			//$stmt->execute();

			//$stmt->bind_result($usernameDB, $passwordDB);
			//$stmt->store_result();

			// Username doesn't exist
			if ($stmt->num_rows() < 1)
			{
				// Send JSON response
			    //$response = new \stdClass();
			    //$response->username = $usernameDB;
			    //$response->psw= $passwordDB;
			    $response->state = 2;
			    echo json_encode($response);
				exit();
			}

			else
			{
				if ($row['username'] == $usernameEntry)
				{
				    // Correct password
					if (password_verify($passwordEntry, $row['password']))
					{
					    // Send JSON response
					 //   $response = new \stdClass();
        			    //$response->username = $usernameDB;
        			    //$response->password= $passwordDB;
        			    $response->state = 1;
        			    echo json_encode($response);


						$_SESSION['login_user'] = $usernameDB;
						header("location: contact_manager.php");
					}
					// Incorrect Password
					else
					{
						// Send JSON response
					    $response = new \stdClass();
        			    $response->username = $usernameDB;
        			    $response->psw= $passwordDB;
        			    $response->state = 3;
        			    echo json_encode($response);
					}
				}
			}
			$stmt->close();
			$conn->close();
		}
	}
?>
