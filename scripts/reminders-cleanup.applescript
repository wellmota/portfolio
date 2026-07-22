tell application "Reminders"
	set L to list "Portfólio: visibilidade"
	set NL to (ASCII character 10)
	tell L
		set r1 to (first reminder whose name contains "conferir indexação")
		set name of r1 to "Search Console: indexação (automatizado)"
		set body of r1 to "Roda sozinho em 27/07 às 9h via tarefa agendada do Claude." & NL & "Você não precisa fazer nada: o relatório chega pronto." & NL & "Só marque como feito quando receber."

		set r2 to (first reminder whose name contains "dados de Desempenho")
		set name of r2 to "Search Console: desempenho (automatizado)"
		set body of r2 to "Roda sozinho em 20/08 às 9h via tarefa agendada do Claude." & NL & "Traz cliques, impressões, consultas e a posição para a busca Wellington Mota." & NL & "Você não precisa fazer nada."
	end tell
	return "ok"
end tell
