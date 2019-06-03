// This code can be adapted into the main javascript code

const searchBtn = document.getElementById("searchBtn");
const addContactBtn = document.getElementById("addContactBtn");
const deleteContactBtn = document.getElementById("deleteContactBtn");
const logoutBtn = document.getElementById("logoutBtn");
const searchForm = document.getElementById("searchForm");
const contactForm = document.getElementById("contactForm");

function showSearchForm()
{
	hideOrShow("searchForm", true);
	hideOrShow("searchBtn", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("deleteContactBtn", false);
}

function cancelSearch()
{
	hideOrShow("searchForm", false);
	hideOrShow("searchBtn", true);
	hideOrShow("addContactBtn", true);
	hideOrShow("deleteContactBtn", true);
}

function showContactForm()
{
	hideOrShow("contactForm", true);
	hideOrShow("searchBtn", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("deleteContactBtn", false);
}

function cancelAddContact()
{
	hideOrShow("contactForm", false);
	hideOrShow("searchBtn", true);
	hideOrShow("addContactBtn", true);
	hideOrShow("deleteContactBtn", true);
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

console.log("Hello World!");
console.log(contactForm);
