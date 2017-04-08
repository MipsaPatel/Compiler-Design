function inputGrammar1() {
	var grammar = [];
	var n = parseInt(prompt("Enter the number of productions: "));
	for (var i = 0; i < n; ++i) {
		grammar.push(prompt("Production " + (i + 1)));
	}
	removeRecursion(grammar);
}

function removeRecursion(grammar) {
	newGrammar = [];
	var nonTerminal, start;
	var alpha, beta, newProduction;
	var index = 3;

	for (var i = 0; i < grammar.length; ++i) {
		var production = grammar[i];
		nonTerminal = production.charAt(0);
		start = production.charAt(index);

		if (start == nonTerminal) {
			alpha = production.substring(index + 1);
			for (j = 0; j < grammar.length; j++) {
				var p2 = grammar[j];
				if (p2.charAt(index) != nonTerminal) {
					beta = p2.substring(index);
					newProduction = nonTerminal + "->" + beta + nonTerminal + "'";
					newGrammar.push(newProduction);
						
					newProduction = nonTerminal + "'->" + alpha + nonTerminal + "'/eps";

					if (newGrammar.indexOf(newProduction) < 0) {
						newGrammar.push(newProduction);							
					}
				}
			}
		}
	}
	// return newGrammar;
	outputGrammar(newGrammar);
}

function outputGrammar(grammar) {
	for (i = 0; i < grammar.length; ++i) {
		alert(grammar[i]);
	}
}