import java.io.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class TopDownParsing {

	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int n, i, index = 3, j;
		
		System.out.print("Enter number of productions: ");
		n = input.nextInt();
		
		List<String> grammar = new ArrayList<String>();

		char nonTerminal;
		String alpha;
		char[] first = new char[10];
		char[] follow = new char[10];
		List<Character> nonTerminals = new ArrayList<>();
		List<Character> terminals = new ArrayList<>();
		
		String[][] parsingTable = new String[10][10];
		
		System.out.println("Enter the productions: ");
		for (i = 0; i < n; i++) {
			String temp;
			temp = input.next();
			grammar.add(temp);
			if (nonTerminals.contains(temp.charAt(0)) == false) {
				nonTerminals.add(temp.charAt(0));
			}
			
			char terminal;
			for (j = 3; j < temp.length(); j++) {
				if (Character.isLowerCase(terminal = temp.charAt(j)) && terminals.contains(temp.charAt(j)) == false) {
					terminals.add(terminal);
				}
			}
		}
		
		terminals.add('$');
		
		for (i = 0; i < n; i++) {
			String production = grammar.get(i);
			nonTerminal = production.charAt(0);
			alpha = production.substring(index);
			
			System.out.println("Enter first of " + alpha + " as a string");
			first = input.next().toCharArray();
			follow = input.next().toCharArray();
			
			int row, col, flag = 0;
			row = nonTerminals.indexOf(nonTerminal);
			
			for(j = 0; j < first.length; j++) {
				
				char p = first[j];
				
				if (p == 'e') {
					flag = 1;
					continue;
				}
				
				col = terminals.indexOf(p);				
				parsingTable[row][col] = production;
			}
			
			if (flag == 1) {
				for(j = 0; j < follow.length; j++) {
					
					char p = follow[j];
					
					col = terminals.indexOf(p);				
					parsingTable[row][col] = production;
				}
			}
		}
			
		System.out.println(nonTerminals);
		System.out.println(terminals);
		
		for (i = 0; i < nonTerminals.size(); i++) {
			for (j = 0; j < terminals.size(); j++) {
				System.out.print(parsingTable[i][j] + " ");
			}
			System.out.println();
		}
	}	
}
