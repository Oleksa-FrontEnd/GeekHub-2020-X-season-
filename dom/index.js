
jQuery('input').on('paste', function (e) {
	e.preventDefault();

	var text = e.originalEvent.clipboardData.getData('text/plain').split('\n');;
	var input = e.currentTarget;

	input.value = `${text}`;
	let targetName = e.target.name; // e.target ссылается на кликнутый элемент

	console.log(`This targetName: ${targetName}`); //console

	let data = text.map(textContent => textContent.split(';'));

	let table = document.querySelector('table');
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	let tr = document.createElement('tr');
	let searchTr = document.querySelectorAll('tr');	//search tage tr
	let indexTr = searchTr[+targetName[1]]; //второй элемент name

	const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
	
	//tr
	let thNumber = data[0].lenght + 1 //ABC...

	$('thead').remove(); //delete child element table
	$('tbody').remove();

	for (let i = 0; i < thNumber; i++) {		//tr for thead
		let th = document.createElement('th');

		(i > 0) ? th.innerHTML = `${alphabet[i-1]}` : th.innerHTML = `&nbsp;`;

		tr.appendChild(th) //position th in thead
	}

	for (let i = 0; i < data.lenght; i++){		//th for body
		let tr = document.createElement('tr'); 
		let th = document.createElement('th'); 

		th.innerHTML = `${i + 1}`		//th for tbody context number 1 2...
		tr.appendChild('th')		//position th in tbody

		for (let j = 0; j < thNumber - 1; j++) {
			let td = document.createElement('td') //td in tr for tbody
			if (!targetName) {
				td.innerHTML = `<input type="text" name="${alphabet[j].toLocaleLowerCase()}" value="">`
			} else {
				td.innerHTML = `<input type="text" name="${alphabet[j].toLocaleLowerCase()}${targetName[i+1]}" value="${data[i][j]}">`
			}
			tr.appendChild(td);		//position td in tbody
		}
			tbody.appendChild(tr)	//position tr for tbody
	}
	table.appendChild(thead);
	table.appendChild(tbody);
	thead.appendChild(tr);
});

var currentColumn;

jQuery('thead th').on('contextmenu', function (e) {
	e.preventDefault();

	currentColumn = e.currentTarget;

	var menu = jQuery('#column-menu');

	menu.addClass('d-block');

	menu.css({
		left: e.clientX,
		top: e.clientY
	});
});

jQuery('#column-menu [data-action]').on('click', function (e) {
	e.preventDefault();

	var action = e.currentTarget.getAttribute('data-action');

	switch (action) {
		case 'add-left':

			break;

		case 'add-right':

			break;

		case 'remove':

			break;
	}

	jQuery('#column-menu').removeClass('d-block');
});
