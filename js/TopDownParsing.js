function inputGrammar() {
	var grammar = [];
	var n = parseInt(prompt("Enter the number of productions: "));
	for (var i = 0; i < n; ++i) {
		grammar.push(prompt("Production " + (i + 1)));
	}

	var innerHtml = "<br>" + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;";
	for (var i = 0; i < grammar.length; ++i) {
		innerHtml += (grammar[i] + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;");
	}

	document.getElementById("inbox").innerHTML = innerHtml;

	return grammar;
}


function inputCheck(parsingTable, terminals, nonTerminals, grammar){
	var stack = [];
	var matched = [];
	var input1 = prompt("Enter an input string");

	var innerHtml = document.getElementById("inbox").innerHTML;
	innerHtml += ("<br><br>" + "Input string: " + "&nbsp;&nbsp;" + input1);
	document.getElementById("inbox").innerHTML = innerHtml;

	stack.push("$");
	stack.push(grammar[0].charAt(0));
	
	for(var i = 0; i < input1.length; i++){
		if(stack[stack.length - 1] == input1[i]){
			matched.push(input1[i]);
			stack.pop();
		}
		else {
			if (nonTerminals.indexOf(stack[stack.length - 1]) >= 0) {
				var temp = parsingTable[nonTerminals.indexOf(stack[stack.length - 1])][terminals.indexOf(input1[i])];
				stack.pop();
				var temp1;
				if (temp != 0 && temp != "9") {
					temp1 = temp.split('').reverse().join('');
					temp1 = temp1.split('');
					for (j = 0; j < temp1.length; j++) {
						stack.push(temp1[j]);				
					}
					i -= 1;
				}
			}
		}
	}

	var innerHtml = document.getElementById("output").innerHTML;
	
	if(stack[stack.length - 1] == '$' && i == input1.length) {
		innerHtml += ("<br><br>" + "Input string MATCHED");
	}
	else {
		innerHtml += ("<br><br>" + "Input string NOT MATCHED");
	}	

	document.getElementById("output").innerHTML = innerHtml;
}


function topDownParsing(grammar) {
	var n, i, index = 3, j;
	var parsingTable = [];
	var nonTerminal;
	var alpha;
	var first = [], follow = [];

	var nonTerminals = [];
	var terminals = [];

	for (i = 0; i < grammar.length; i++) {
		var temp = grammar[i];

		if (nonTerminals.indexOf(temp.charAt(0)) < 0) {
			nonTerminals.push(temp.charAt(0));							
		}
			
		var terminal;
		
		for (j = 3; j < temp.length; ++j) {
			terminal = temp.charAt(j);
			if (terminal == terminal.toLowerCase() && terminal != "9" && terminals.includes(temp.charAt(j)) == false) {
				terminals.push(terminal);
			}
		}		
	}

	terminals.push('$');

	for (i = 0; i < nonTerminals.length; ++i) {
		var temp = [];
		for (j = 0; j < terminals.length; ++j) {
			temp.push(0);
		}
		parsingTable.push(temp);
	}

	for (i = 0; i < grammar.length; i++) {
		var production = grammar[i];
		nonTerminal = production.charAt(0);
		alpha = production.substring(index);

		var first = prompt("Enter first of " + alpha + " as a string").split("");
		var follow = prompt("Enter follow of " + nonTerminal + " as a string").split("");

		var row, col, flag = 0;
		row = nonTerminals.indexOf(nonTerminal);
			
		for(j = 0; j < first.length; j++) {				
			var p = first[j];				
			if (p == '9') {
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
			for(j = 0; j < follow.length; j++) {
				var p = follow[j];
				col = terminals.indexOf(p);

				if (parsingTable[row][col] == 0) {
					parsingTable[row][col] = production.substring(3);
				}	

				else {
					parsingTable[row][col] += ("," + production.substring(3));
				}		
			}
		}
	}
	outputParsingTable(parsingTable, terminals, nonTerminals);
	inputCheck(parsingTable, terminals, nonTerminals, grammar);
	
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
