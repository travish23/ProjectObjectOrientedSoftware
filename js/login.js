
// Called when submit button on login page is hit
function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;

	var jsonPayload = '{"username" : "' + username + '", "psw" : "' + password + '"}';

	var url = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/testlogin.php';

	alert("Javascript");
	var xhr = new XMLHttpRequest();
	//xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	xhr.onreadystatechange = function()
		{


		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200)
			{
        var json = JSON.parse(xhr.responseText);


				// Passwords matched
				if(json.state == 1) {

					console.log("test");
				    window.location.href = 'http://contactmanager.site/ProjectOjectOrientedSoftware/API/contactmanager.php';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		}
		xhr.open("POST", url, true);
		xhr.send(jsonPayload);
}
