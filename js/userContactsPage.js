// This code can be adapted into the main javascript code

function showSearchForm()
{
	hideOrShow("formsDiv", true);
	hideOrShow("searchForm", true);
	hideOrShow("contactForm", false);
	hideOrShow("deleteForm", false);

	//cancelDeleteContact();
}

function cancelSearch()
{
	hideOrShow("formsDiv", false);
	hideOrShow("searchForm", false);
}

function showContactForm()
{
	hideOrShow("formsDiv", true);
	hideOrShow("contactForm", true);
	hideOrShow("searchForm", false);
	hideOrShow("deleteForm", false);

	//cancelDeleteContact();
}

function cancelAddContact()
{
	hideOrShow("formsDiv", false);
	hideOrShow("contactForm", false);
}

function showDeleteForm()
{
	hideOrShow("formsDiv", true);
	hideOrShow("deleteForm", true);
	hideOrShow("contactForm", false);
	hideOrShow("searchForm", false);
	hideOrShow("searchBtn", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("editContactBtn", false);
	hideOrShow("deleteContactBtn", false);

	const table = document.querySelector("#contactTable");

	table.addEventListener("click", allowSelection);
}

function cancelDeleteContact()
{
	hideOrShow("formsDiv", false);
	hideOrShow("deleteForm", false);
	hideOrShow("searchBtn", true);
	hideOrShow("addContactBtn", true);
	hideOrShow("editContactBtn", true);
	hideOrShow("deleteContactBtn", true);

	const rows = document.querySelectorAll("#contactTable tr");
	for(let i = 0; i < rows.length; i++)
	{
		if(rows[i].classList.contains("selected"))
			rows[i].classList.remove("selected");
	}

	document.querySelector("#contactTable").removeEventListener("click", allowSelection);
}

function showEditForm()
{
	hideOrShow("formsDiv", true);
	hideOrShow("editForm", true);
	hideOrShow("contactForm", false);
	hideOrShow("searchForm", false);
	hideOrShow("searchBtn", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("editContactBtn", false);
	hideOrShow("deleteContactBtn", false);

	const table = document.querySelector("#contactTable");

	table.addEventListener("click", allowEditSelection);
}

function cancelEditContact()
{
	hideOrShow("formsDiv", false);
	hideOrShow("editForm", false);
	hideOrShow("searchBtn", true);
	hideOrShow("addContactBtn", true);
	hideOrShow("editContactBtn", true);
	hideOrShow("deleteContactBtn", true);

	const row = document.querySelector(".selected");
	if(row != null)
		row.classList.remove("selected");

	document.querySelector("#contactTable").removeEventListener("click", allowEditSelection);
}

function allowSelection(event)
{
	const row = event.target.parentNode;

	if(row.id == "firstRow" || row.classList.contains("blankRow"))
		return;

	if(!row.classList.contains("selected"))
		row.classList.add("selected");
	else {
		row.classList.remove("selected");
	}
}

function allowEditSelection(event)
{
	const row = event.target.parentNode;

	if(row.id == "firstRow" || row.classList.contains("blankRow"))
		return;


	if(!row.classList.contains("selected"))
	{
		row.classList.add("selected");
		const rows = document.querySelectorAll("#contactTable tr");
		for(let i = 0; i < rows.length; i++)
		{
			if(rows[i].classList.contains("selected") && rows[i] != row)
				rows[i].classList.remove("selected");
		}
	}
}

function hideOrShow(elementId, showState)
{
	var vis = "visible";

	if(document.getElementById(elementId).parentElement.id == "contactButtonsBox")
		var dis = "inline";
	else
		var dis = "block";

	if(!showState)
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById(elementId).style.visibility = vis;
	document.getElementById(elementId).style.display = dis;
}
