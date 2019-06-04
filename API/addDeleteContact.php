<html>

<head>
<title>Address Book contact</title>
</head>
<body>
    
<?php
// Connects to your Database -- need to change db name and logic
 mysql_connect("localhost", "luua4y2c74pm", "@Contact4331") or die(mysql_error()); 
 mysql_select_db("Cop4331Project1") or die(mysql_error()); 
 
$mode = $_GET['mode'];
$name = $_GET['name'];
$phone = $_GET['phone'];
$email = $_GET['email'];
$address = $_GET['address'];
$id = $_GET['id'];
$self = $_SERVER['PHP_SELF'];

if ( $mode=="add")
{
print '<h2>Add Contact</h2>;
</p>
<form action=';
echo $self;
Print '
method=GET>
<table>
<tr><td>Name:</td><td><input type="text" name="name" /></td></tr>
<tr><td>Phone:</td><td><input type="text" name="phone" /></td></tr>
<tr><td>Email:</td><td><input type="text" name="email" /></td></tr>
<tr><td>address:</td><td><input type="text" name="address" /></td></tr>
<tr><td colspan="2" align="center"><input type="submit" /></td></tr>
<input type=hidden name=mode value=added>
</table>
</form> <p>';
}
if ( $mode=="added")
{
mysql_query ("INSERT INTO address (name, phone, email, address) VALUES ('$name', '$phone', '$email', '$address')");
}

if ( $mode == "delete")
{
    mysql_query ("DELETE FROM address where id=$id");
}

?>


	</body>

</html>
