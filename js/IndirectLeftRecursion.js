function inputGrammar1() {
	var grammar = [];
	var terminal = [];
	var nonterminal = [];
	var n = parseInt(prompt("Enter the number of productions: "));
	for (var i = 0; i < n; i++) {
		grammar.push(prompt("Production " + (i + 1)));
		if(nonterminal.indexOf(grammar[i].charAt(0)) == -1){
			nonterminal.push(grammar[i].charAt(0));
		}
	}
	removeIndirectLeftRecursion(grammar, nonterminal);
}


function removeIndirectLeftRecursion(grammar) {
	var gamma, newProduction, newProduction, delta;
	var newGrammar = [], nonterminal = [];

	for (var i = 0; i < grammar.length; i++) {
		if(nonterminal.indexOf(grammar[i].charAt(0)) == -1){
			nonterminal.push(grammar[i].charAt(0));
		}
	}

	for(var i = 0; i < nonterminal.length; i++){
		for(var j = 0; j <= i - 1; j++){
			for(var k = 0; k < grammar.length; k++){
				if(nonterminal[i] == grammar[k].charAt(0) && nonterminal[j] == grammar[k].charAt(3) && nonterminal[i] != nonterminal[j]){
					gamma = grammar[k].substring(4);

					for(var l = 0; l < grammar.length; l++){
						if(nonterminal[j] == grammar[l].charAt(0)){
							delta = grammar[l].substring(3);
							newProduction = nonterminal[i] + "->" + delta + gamma;
							newGrammar.push(newProduction);
						}
					}
					for(var m = 0; m < grammar.length; m++){

						if(nonterminal[i] == grammar[m].charAt(0) && nonterminal[j] != grammar[m].charAt(3)){
							newProduction = grammar[m];
							newGrammar.push(newProduction);
						}

						if(nonterminal[j] == grammar[m].charAt(0)){
							newGrammar.push(grammar[m]);
						}
					}
				}
			}
		}
		alert(newGrammar);
		removeRecursion(newGrammar);
	}
}


function outputGrammar1(grammar) {
	for (i = 0; i < grammar.length; ++i) {
		alert(grammar[i]);
	}
}
