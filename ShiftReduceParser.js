function shiftReduceParser() {
	stack="$";
	loc=0;
	arr=[];

	no=prompt("Enter number of productions :");
	alert("Enter the productions");
	productions=new Array();
	for (i=0; i < no; i++)
	{
		productions[i]=new Array(2);
		productions[i][0]=prompt("LHS for production "+(i+1)+": ");

		productions[i][1]=prompt("RHS for production "+(i+1)+": ");

	}

	innerHtml = "&nbsp;&nbsp;&nbsp;&nbsp;";
	innerHtml += ("The productions are:");
	innerHtml += ("<br>");

	for (i=0; i < no; i++)
	{
		innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
		innerHtml += (productions[i][0]+" -> "+productions[i][1]);
		innerHtml += ("<br>");
	}
	document.getElementById("input").innerHTML = innerHtml;

	str=prompt("Enter a space separated string: ");
	str=str+"$";

	innerHtml = "&nbsp;&nbsp;&nbsp;&nbsp;";
	innerHtml += ("STACK"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"INPUT");
	innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
	innerHtml += (stack+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+str);
	while (loc < str.length-1)
	{
		temp = str.substring(loc, str.indexOf(' ', loc));
		loc = str.indexOf(' ', loc)+1;
		for (i=0; i < no; i++)
		{
			if (temp==productions[i][1])
			{
				//innerHtml += ((stack+temp)+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+str.substring(loc, str.length));

				temp = productions[i][0];
				arr.push(productions[i][1]);
				break;
			}
		}
		stack = stack+temp;
		innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
		innerHtml += (stack+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+str.substring(loc, str.length));
		for (i=0; i < no; i++)
		{
			if (stack.endsWith(productions[i][1]))
			{			
				l=productions[i][1].length;
				stack = stack.substring(0,stack.length-l)+productions[i][0];
							
				innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
				innerHtml += (stack+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+str.substring(loc, str.length));

				arr.push(productions[i][1]);
				
				break;
			}
		}
	}
	for (i=0; i < no; i++)
	{
		if (stack=="$"+productions[i][1])
		{
			stack = "$"+productions[i][0];
			break;
		}
	}
	innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
	innerHtml += (stack+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+"&nbsp;&nbsp;&nbsp;&nbsp"+str.substring(loc, str.length));
	if (stack=="$"+productions[0][0])
	{

		innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
		innerHtml += ("Accepted.");
	}
	else
	{
		innerHtml += ("</br>" + "&nbsp;&nbsp;&nbsp;&nbsp");
		innerHtml += ("Rejected.");
	}

	innerHtml += ("</br><br>HANDLES: ");

	innerHtml += (arr);

	document.getElementById("output").innerHTML = innerHtml;
}
