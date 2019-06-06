function checkForUpdate()
{
    if (window.applicationCache !== undefined && window.applicationCache !== null)
    {
        window.applicationCache.addEventListener('updateready', updateApplication);
    }
}

function updateApplication(event)
{
    if (window.applicationCache.status != 4) return;
    window.applicationCache.removeEventListener('updateready', updateApplication);
    window.applicationCache.swapCache();
    window.location.reload();
}




// Called when submit button on login page is hit
function doLogin()
{
	var username = document.getElementById("loginUser").value;
	var password = document.getElementById("loginPass").value;

	var jsonPayload = '{"username" : "' + username + '", "password" : "' + password + '"}';

	var url = 'http://contactmanager.site/ProjectObjectOriented/API/login.php';
	//alert("Javascript");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function()
		{
		    // Complete
			if (xhr.readyState == 4 && xhr.status == 200)
			{
                var json = JSON.parse(xhr.response);
                console.console.log(xhr.response);
				// Passwords matched
				if(json.state == 1) {
				    window.location.href = 'http://contactmanager.site/ProjectObjectOrientedSoftware/API/contactmanager.php';
				}
				else{
				    alert("Incorrect Username or Password");
				}
			}
		};


	}

	catch(err)
	{
		alert(err.message);
	}
}
