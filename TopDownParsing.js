function inputGrammar() {
	var grammar = [];
	var n = parseInt(prompt("Enter the number of productions: "));
	for (var i = 0; i < n; ++i) {
		grammar.push(prompt("Production " + (i + 1)));
	}
	console.log(grammar);

	return grammar;

	// topDownParsing(grammar);
}

function topDownParsing(grammar) {
	var n, i, index = 3, j;
	var parsingTable = [];
	var nonTerminal;
	var alpha;
	var first = [], follow = [];

	var nonTerminals = [];
	var terminals = [];

	console.log("Parsing " + grammar);

	for (i = 0; i < grammar.length; i++) {
		var temp = grammar[i];

		console.log(temp);

		if (nonTerminals.indexOf(temp.charAt(0)) < 0) {
			nonTerminals.push(temp.charAt(0));							
		}
			
		var terminal;
		
		for (j = 3; j < temp.length; ++j) {
			terminal = temp.charAt(j);
			if (terminal == terminal.toLowerCase() && terminal != "e" && terminals.includes(temp.charAt(j)) == false) {
				terminals.push(terminal);
			}
		}		
	}

	console.log("nonTerminals " + nonTerminals);
	console.log("Terminals " + terminals);

	terminals.push('$');

	for (i = 0; i < nonTerminals.length; ++i) {
		var temp = [];
		for (j = 0; j < terminals.length; ++j) {
			temp.push(0);
		}
		parsingTable.push(temp);
	}
	console.log("table " + parsingTable);

	for (i = 0; i < grammar.length; i++) {
		var production = grammar[i];
		nonTerminal = production.charAt(0);
		alpha = production.substring(index);

		var first = prompt("Enter first of " + alpha + " as a string").split("");
		console.log(first);
		var follow = prompt("Enter follow of " + nonTerminal + " as a string").split("");
		console.log(follow);

		var row, col, flag = 0;
		row = nonTerminals.indexOf(nonTerminal);
			
		for(j = 0; j < first.length; j++) {
				
			var p = first[j];
				
			if (p == 'e') {
				flag = 1;
				continue;
			}
				
			col = terminals.indexOf(p);	
			if (parsingTable[row][col] == 0) {
				parsingTable[row][col] = production.substring(3);
			}	

			else {
				parsingTable[row][col] += ("," + production.substring(3));
			}		
		}

		if (flag == 1) {
			console.log("Follow! " + follow);
			for(j = 0; j < follow.length; j++) {

				var p = follow[j];
				console.log(p);
				col = terminals.indexOf(p);				
				if (parsingTable[row][col] == 0) {
					parsingTable[row][col] = production.substring(3);
				}	

				else {
					parsingTable[row][col] += ("," + production.substring(3));
				}		
				console.log(parsingTable[row][col] + " F");
			}
		}
	}
	outputParsingTable(parsingTable, terminals, nonTerminals);
	return parsingTable;
}

function outputParsingTable(parsingTable, terminals, nonTerminals) {

	innerHtml = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

	for (i = 0; i < terminals.length; ++i) {
		innerHtml = innerHtml + terminals[i] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	innerHtml += "<br><br>";

	for (i = 0; i < nonTerminals.length; ++i) {
		innerHtml += nonTerminals[i] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		for (j = 0; j < terminals.length; ++j) {
			innerHtml = innerHtml + parsingTable[i][j];

			if (parsingTable[i][j] != 0) {
				for (k = parsingTable[i][j].length; k < 11; ++k) {
					innerHtml += "&nbsp;";
				}
			}
			else {
				innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			}
		}
		innerHtml += "<br><br>";
	}

	document.getElementById("output").innerHTML = innerHtml;

	

}