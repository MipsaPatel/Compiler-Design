var grmr = new Array();

function first(i) {}
	l = 0, found = 0;
	temp = "", str = "";
	
	for(j = 0; j < grmr[i].length; j++) { //number of productions
		for(k = 0; k < grmr[i][j].length; k++, found = 0) { //when nonterminal has epsilon production
			for(l = 0; l < ntlen; l++) { //finding nonterminal
				if(grmr[i][j][k] == ntermnl[l]) {
					str = first(l);
					if(!(str.length == 1 && str[0] == '9')) { //when epsilon production is the only nonterminal production
						temp = temp + str;
					}
					found = 1;
					break;
				}
			}
			if(found == 1) {
				if(str.indexOf("9") !== -1) { //here epsilon will lead to next nonterminal’s first set
					continue;
				}
			}
			else { //if first set includes terminal
				temp = temp + grmr[i][j][k];
			}

			break;
		}
	}
	return temp;
}


function follow(i1) {
	var temp = "";
	var found = 0, j1, k1;
	if(i1 == 0)
		temp = "$";

	for(j1 = 0; j1 < ntlen; j1++) {
		for(k1 = 0; k1 < grmr[j1].length; k1++) { //entering grammar matrix
			pro = new Array(grmr[j1][k1].length);
			pro = grmr[j1][k1].split('');
			for(l1 = 0; l1 < pro.length; l1++) { //entering each production
				if(pro[l1] == ntermnl[i1]) { //finding the nonterminal whose follow set is to be found
					if(l1 == pro.length - 1) { //if it is the last terminal/non-terminal then follow of current non-terminal
						if(j1 < i1)
							temp = temp + flw[j1];
					}
					else {
						for(m1 = 0; m1 < ntlen; m1++) {
							if(pro[l1 + 1] == ntermnl[m1]) { //first of next non-terminal otherwise (else later…)
								chr = new Array(fst[m1].length);
								chr = fst[m1].split('');
								for(n1 = 0; n1 < chr.length; n1++) {
									if(chr[n1] == '9') { //if first includes epsilon
										if(l1 + 1 == pro.length - 1)
											temp = temp + follow(j1); //when non-terminal is second last
										else
											temp = temp + follow(m1);
									}
									else
										temp = temp + chr[n1]; //include whole first set except epsilon
								}
								found = 1;
							}
						}
						if(found != 1)
							temp = temp + pro[l1 + 1]; //follow set will include terminal(else is here)
					}
				}
			}
		}
	}
	return temp;
}


function removeDuplicates(str)
{
	var seen = new Array(256);
	sb = "";
	for(i = 0; i < str.length; i++)
	{
		ch = str[i];
		if (!seen[ch])
		{
			seen[ch] = true;
			sb = sb + ch;
		}
	}
	return sb.toString();
}


function input() {
	nt = prompt("Enter the non terminals");
	ntlen = nt.length;
	ntermnl = new Array(ntlen);
	ntermnl = nt.split('');
	t = prompt("Enter the terminals");
	tlen = t.length;
	termnl = new Array(tlen);
	termnl = t.split('');
	alert("Specify the grammar(Enter 9 for epsilon production)");

	var innerHtml = "&nbsp;&nbsp&nbsp;&nbsp" + "<br><br>";
	for(i = 0; i < ntlen; i++) {
		n = parseInt(prompt("Enter the number of productions for " + ntermnl[i]));
		grmr[i] = new Array(n);
		for(j = 0; j < n; j++) {
			grmr[i][j] = prompt("Enter the productions");
		}

		innerHtml += ("&nbsp;&nbsp&nbsp;&nbsp" + ntermnl[i] + "->");

		for(z = 0; z < n; z++) {
			innerHtml += grmr[i][z];

			if(z != n - 1)
				innerHtml += " &nbsp; | &nbsp; ";
		}
	}
	document.getElementById("input").innerHTML = innerHtml;

	fst = new Array(ntlen);
	for(i = 0; i < ntlen; i++)
		fst[i] = first(i);

	FIRST = [];

	innerHtml = "<br><br>" + "&nbsp;&nbsp;&nbsp;&nbsp";
	innerHtml += ("NT"+"&nbsp;&nbsp;&nbsp;&nbsp"+"FIRST" + "<br><br>");

	var ind = 0;	
	for(l = 0; l < ntlen; l++) {
		innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp" + ntermnl[ind] + "&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp");
		innerHtml += removeDuplicates(fst[l]);

		lll = ntermnl[ind]
		fff = removeDuplicates(fst[l]);
		innerHtml += "<br><br>";
		FIRST[ind] = fff;
		ind++;
	}

	flw = new Array(ntlen);
	for(ij = 0; ij < ntlen; ij++)
		flw[ij] = follow(ij);

	innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp" + "NT" + "&nbsp;&nbsp;&nbsp;&nbsp" + "FOLLOW" + "<br><br>");

	var ind1 = 0;	
	for(l1 = 0; l1 < ntlen; l1++) {

		innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp;" + ntermnl[ind1] + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&nbsp;&nbsp;&nbsp;&nbsp;" + "&nbsp;&nbsp;&nbsp;&nbsp;");
		innerHtml += (removeDuplicates(flw[l1]));
		innerHtml += "<br><br>";

		ind1++;
	}
	document.getElementById("output").innerHTML = innerHtml;
}
