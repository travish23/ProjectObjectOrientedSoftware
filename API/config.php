<?php

	function connectDataBase(){
	
	define('DB_SERVER', 'localhost');
	define('DB_USERNAME', 'luua4y2c74pm' );
	define('DB_PASSWORD' , '@Contact4331');
	define('DB_DATABASE', 'COP4331');
	
	$db = mysql_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
	
	
	return $db;
	}

?>