jQuery('input').on('paste', function(e) {
    e.preventDefault();

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

    var text = e.originalEvent.clipboardData.getData('text/plain');
    var input = e.currentTarget;

    let name = $(input).attr('name');
    let selected = alphabet.filter(function(letter) {
        return name.search(letter.toLocaleLowerCase()) === 0;
    })[0];
    let generation = /(\d+)/.exec(name)[0];
    generation = +generation;

    var textArray = text.split(/\n/);

    let rowCount = textArray.length;

    let colCount = 0;
    let letterIndex = alphabet.indexOf(selected);

    let tableBody = [];
    let emptyArray = [];

    for (let i = 0; i < rowCount; i++) {
        var splitArray = textArray[i].split(';');
        colCount = Math.max(colCount, splitArray.length);
    }
    for (let j = 0; j < colCount; j++) {
        emptyArray[j] = '';
    }

    for (let i = 0; i < rowCount; i++) {
        var splitArray = textArray[i].split(';');
        splitArray = splitArray.concat(emptyArray.slice(splitArray.length));
        let newGeneration = generation + i;
        let newLetterIndex = letterIndex;
        let html = splitArray.map((word) => {
            let myLetter = alphabet[newLetterIndex].toLocaleLowerCase();
            newLetterIndex++;
            return `<td><input type="text" name="${myLetter}${newGeneration}" value="${word.replace(/"/g, "&quot;")}"/></td>`;
        });

        let emptyFields = alphabet.slice(0, letterIndex).map((l) => {
            let myLetter = l.toLocaleLowerCase();
            return `<td><input type="text" name="${myLetter}${newGeneration}" value=""/></td>`;
        });

        html = emptyFields.concat(html);
        colCount = html.length;
        html = `
				<tr>
					<th>${newGeneration}</th>
					${html.join('\n')}
				</tr>
				`;
        tableBody.push(html);
    }

    for (let g = generation - 1; g > 0; g--) {
        let html = [];
        for (let i = 0; i < colCount; i++) {
            let letter = alphabet[i].toLocaleLowerCase();
            html.push(`<td><input type="text" name="${letter}2" value=""/></td>`);
        }
        html = html.join('\n');
        html = `
				<tr>
					<th>${g}</th>
					${html}
				</tr>
				`;
        tableBody = [html].concat(tableBody);
    }

    let usedLetters = alphabet.slice(0, colCount);
    let tableTheadRows = ['&nbsp;'].concat(usedLetters).map((l) => {
        return `<th>${l}</th>`;
    }).join('\n');
    tableTheadRows = `
		<tr>
			${tableTheadRows}
		</tr>
		`;

    $('thead').html(tableTheadRows);
    $('tbody').html(tableBody.join(' '))
});


var currentColumn;

jQuery('thead th').on('contextmenu', function(e) {
    e.preventDefault();

    currentColumn = e.currentTarget;

    var menu = jQuery('#column-menu');

    var th = $('thead th');

    if (currentColumn === th[0]) {
        menu.removeClass('d-block');
    } else {
        menu.addClass('d-block');
    }

    menu.css({
        left: e.clientX,
        top: e.clientY
    });
});

jQuery('#column-menu [data-action]').on('click', function(e) {
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