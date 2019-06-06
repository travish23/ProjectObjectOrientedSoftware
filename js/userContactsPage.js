// This code can be adapted into the main javascript code

function showContactForm()
{
	hideOrShow("contactForm", true);
	hideOrShow("deleteForm", false);
}

function cancelAddContact()
{
	hideOrShow("contactForm", false);
}

function showDeleteForm()
{
	hideOrShow("deleteForm", true);
	hideOrShow("contactForm", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("editContactBtn", false);
	hideOrShow("deleteContactBtn", false);

	const table = document.querySelector("#contactTable");

	table.addEventListener("click", allowSelection);
}

function cancelDeleteContact()
{
	hideOrShow("deleteForm", false);
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
	hideOrShow("editForm", true);
	hideOrShow("contactForm", false);
	hideOrShow("addContactBtn", false);
	hideOrShow("editContactBtn", false);
	hideOrShow("deleteContactBtn", false);

	const table = document.querySelector("#contactTable");

	table.addEventListener("click", allowEditSelection);
}

function cancelEditContact()
{
	hideOrShow("editForm", false);
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
