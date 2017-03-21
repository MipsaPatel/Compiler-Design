import java.util.*;

public class Recursion {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);
		int n, i, index = 3, j;
		
		System.out.print("Enter number of productions: ");
		n = input.nextInt();
		
		List<String> grammar = new ArrayList<String>();
		Set<String> newGrammar = new LinkedHashSet<String>();

		char nonTerminal, start;
		String alpha, beta, newProduction;
		
		System.out.println("Enter the productions: ");
		for (i = 0; i < n; i++) {
			grammar.add(input.next());
		}
		
		for (i = 0; i < grammar.size(); i++) {
			String production = grammar.get(i);
			nonTerminal = production.charAt(0);
			start = production.charAt(index);
						
			if (start == nonTerminal) {
				alpha = production.substring(index + 1);
				for (j = 0; j < grammar.size(); j++) {
					String p2 = grammar.get(j);
					if (p2.charAt(index) != nonTerminal) {
						beta = p2.substring(index);
						newProduction = nonTerminal + "->" + beta + nonTerminal + "'";
						newGrammar.add(newProduction);
						
						newProduction = nonTerminal + "'->" + alpha + nonTerminal + "'/eps";
						newGrammar.add(newProduction);
						
					}
				}
			}
		}
		
		for (Iterator<String> it = newGrammar.iterator(); it.hasNext(); ) {
			System.out.println(it.next());
		}
	}
}
