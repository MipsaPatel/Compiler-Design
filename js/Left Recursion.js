function removeRecursion(grammar) {
	newGrammar = [];
	newMapping = [];
	nonTerminals = [];
	var nonTerminal, start;
	var alpha, beta, newProduction;
	var index = 3;
	char = 'Z';

	for (var i = 0; i < grammar.length; ++i) {
		var production = grammar[i];
		nonTerminal = production.charAt(0);

		start = production.charAt(index);

		if (start == nonTerminal) {
			alpha = production.substring(index + 1);
			for (j = 0; j < grammar.length; j++) {
				var p2 = grammar[j];
				if (p2.charAt(index) != nonTerminal && p2.charAt(0) == nonTerminal) {
					if (nonTerminals.indexOf(nonTerminal) < 0) {
						nonTerminals.push(nonTerminal);
					}
					beta = p2.substring(index);

					if (newMapping.indexOf(nonTerminal) <= -1) {
						char = String.fromCharCode(char.charCodeAt() - 1);
						newMapping.push(nonTerminal);
						newMapping.push(char);
					}

					else {
						char = newMapping[newMapping.indexOf(nonTerminal) + 1];
					}

					newProduction = nonTerminal + "->" + beta + char;					
					if (newGrammar.indexOf(newProduction) < 0) {
						newGrammar.push(newProduction);							
					}
						
					newProduction = char + "->" + alpha + char;
					if (newGrammar.indexOf(newProduction) < 0) {
						newGrammar.push(newProduction);							
					}

					newProduction = char + "->" + "e";
					if (newGrammar.indexOf(newProduction) < 0) {
						newGrammar.push(newProduction);							
					}
				}
			}
		}
	}

	for (i = 0; i < grammar.length; i++) {
		if (nonTerminals.indexOf(grammar[i].charAt(0)) < 0) {
			nonTerminals.push(grammar[i].charAt(0));
			for (j = i; j < grammar.length; j++) {
				if (grammar[j].charAt(0) == grammar[i].charAt(0)) {
					newGrammar.push(grammar[j]);
				}
			}
		}
	}
	outputGrammar(newGrammar);

	return newGrammar;
}


function outputGrammar(grammar) {
	var innerHtml = "&nbsp;&nbsp;&nbsp;&nbsp;";
	for (var i = 0; i < grammar.length; ++i) {
		innerHtml += (grammar[i] + "<br>" + "&nbsp;&nbsp;&nbsp;&nbsp;");
	}

	document.getElementById("output").innerHTML = innerHtml;
}
