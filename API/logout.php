<?php
	session_start();
	$_SESSION = array();
	if(session_destroy()) 
	{
		header("Location: index.html");
	}
?>
