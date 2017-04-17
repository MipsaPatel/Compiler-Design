var op=new Array('+','-','*','/','=','<','>','%',',','&'); 
var delimiter=new Array('}','{',';','(',')','[',']',','); 
var key=new Array("auto","break","case","char","const","continue","default",
	"do","double","else","enum","extern","float","for","goto",
	"if","int","long","register","return","short","signed",
	"sizeof","static","struct","switch","typedef","union",
	"unsigned","void","volatile","while"); 
var identifier=new Array(200);
var literal=new Array(200);
var operator=new Array(200);
var delim=new Array(200);
var keyword=new Array(200);
var liti=0,deli=0,keyi=0;
var idi=0,opi=0;

function output()
{
	console.log("Here");
	innerHtml = "&nbsp;&nbsp;&nbsp;&nbsp;";
	innerHtml += ("Identifiers are:");
	innerHtml += ("<br>");

	for( var m=0;m<idi;m++)
	{
		if(identifier[m]!="")
		{
			innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
			innerHtml += (identifier[m]);
		}
	}

	innerHtml += "<br><br>";
	innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp;" + "Operators are:");
	innerHtml += ("<br>");

	for(var m=0;m<opi;m++)
	{
		innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
		innerHtml += (operator[m]);
	}

	innerHtml += "<br><br>";
	innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp;" + "Literals are:");
	innerHtml += ("<br>");

	for(var m=0;m<liti;m++)
	{
		innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
		innerHtml += (literal[m]);
	}

	innerHtml += "<br><br>";
	innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp;" + "Delimiters are:");
	innerHtml += ("<br>");

	for(var m=0;m<deli;m++)
	{
		innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
		innerHtml += (delim[m]);
	}

	innerHtml += "<br><br>";
	innerHtml += ("&nbsp;&nbsp;&nbsp;&nbsp;" + "Keywords are:");
	innerHtml += ("<br>");
	for(var m=0;m<keyi;m++)
	{
		innerHtml += "&nbsp;&nbsp;&nbsp;&nbsp;";
		innerHtml += (keyword[m]);
	}

	document.getElementById("output").innerHTML = innerHtml;
}

function isIdentifier( ch)
{
	if( /^[A-Z]$/i.test(ch)||ch=='_'||/^\d+$/.test(ch)||ch=='.') 
		return true; 
	else 
		return false; 
}

function isOperator( ch)
{

	var f=false;
	for(var i=0;i<10 && !f;i++) 
	{ 
		if(ch==op[i]) 
			f=true; 
	} 
	return f; 
}

function isDelimiter(ch)
{
	var f=false;
	for(var i=0;i<8 && !f;i++) 
	{ 
		if(ch==delimiter[i]) 
			f=true; 
	} 
	return f; 
}

function isKeyword()
{
	var x,y;
	for(x=0;x<idi;x++)
	{
		for(y=0;y<32;y++)
		{
			if(identifier[x]==key[y])
			{
				keyword[keyi++]=identifier[x];
				identifier[x]="";
			}
		}
	}
}

function lex()
{
	var i=0;
	var id="";
	var lit="";
	var op="";
	var del="";

	str = prompt("Enter a string for lexical analysis: ");
	document.getElementById("input").innerHTML = ("&nbsp;&nbsp;&nbsp;&nbsp;" + "Input String: " + str);

	while(i<str.length)
	{
		if(str[i]==' ')
		{
			i++;
		}			
		if(isIdentifier(str[i]))
		{
			id="";
			while(isIdentifier(str[i]))
			{
				id=id+str[i];
				i=i+1;
				if(i==str.length)
					break;
			}
			identifier[idi++]=id;
		}
		else if(str[i]=='"')
		{
			lit="";

			lit=lit+str[i];
			for(j=i+1;str[j]!='"';j++)
			{
				lit=lit+str[j];
			}
			lit=lit+'"';
			literal[liti++]=lit;
			i=j+1;
		}
		else if(isOperator(str[i]))
		{
			op="";
			while(isOperator(str[i]))
			{
				op=op+str[i];
				i=i+1;
				if(i==str.length)
					break;
			}
			operator[opi++]=op;
		}
		else if(isDelimiter(str[i]))
		{
			del="";
			while(isDelimiter(str[i]))
			{
				del=del+str[i];
				i=i+1;
				if(i==str.length)
					break;
			}
			delim[deli++]=del;
		}
	}
	isKeyword();
	output();
}