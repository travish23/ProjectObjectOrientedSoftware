// This code can be adapted into the main javascript code

function forgotPassword()
{
	document.getElementById("forgotPassBtn").value = "that sucks:(";
}




function hideOrShow(elementId, showState)
{
	var vis = "visible";
	var dis = "initial";
	if(!showState)
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById(elementId).style.visibility = vis;
	document.getElementById(elementId).style.display = dis;
}

console.log("Hello World");
