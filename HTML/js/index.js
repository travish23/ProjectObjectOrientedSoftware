// This code can be adapted into the main javascript code

function forgotPassword()
{
	document.getElementById("forgotPassBtn").value = "that sucks:(";
}

function showRegisterForm()
{
	hideOrShow("registerForm", true);
	hideOrShow("loginForm", false);
}

function cancelRegister()
{
	hideOrShow("registerForm", false);
	hideOrShow("loginForm", true);
}


function hideOrShow(elementId, showState)
{
	var vis = "visible";
	var dis = "block";
	if(!showState)
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById(elementId).style.visibility = vis;
	document.getElementById(elementId).style.display = dis;
}
