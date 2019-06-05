<?php
	session_start();
	$conn = new mysqli("localhost", "luua4y2c74pm", "@Contact4331", "Cop4331Project1");
	
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		$username = $_POST['username'];
		$password = $_POST['password']; 
		$authpassword = $_POST['password_confirm'];
		
		if($password != $authpassword)
		{
			
		echo '<script type="text/javascript">

                window.onload = function () { alert("Passwords do not match"); }
            
                </script>';
		
			
			exit();
		}
		
	
		
		if (mysqli_connect_errno($conn))
		{
			echo("Failed to connect to MySQL: " . mysqli_connect_error($conn));
		}
		
		else
		{
			//$hashed_password = password_hash($password, PASSWORD_DEFAULT);
			
			$stmt = $conn->prepare("INSERT INTO Users (name,password) VALUES (?, ?)");
			
			$stmt->bind_param("ss", $username, $password);
			
			if($stmt->execute())
			{
			    echo '<script type="text/javascript">

                window.onload = function () { alert("Successfull Signup!"); }

                </script>';
			
			   
			
			}
			
			else
			{
			
				echo '<script type="text/javascript">

                window.onload = function () { alert("Username take, please try again"); }

                </script>';
				
				
			}
			
			$stmt->close();
			$conn->close();
		}
	}
	
?>
