<?php
	function getDataBase()
	{
		define('DB_SERVER', '127.0.0.1');
		define('DB_USERNAME', 'callingallgamers');
		define('DB_PASSWORD', '1234thumbwar');
		define('DB_DATABASE', 'poop_s19');
		$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
		return $db;
	}

?>
