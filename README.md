### Descrição

Esta aplicação se conecta a um websocket que mocka entradas de dados de ações.
Para ouvir o websocket foi utilizado o react-use-websocket que é uma lib que me da acesso a um hook que permite tal acesso

Uma vez que a aplicação pôde ouvir os dados enviados fora necessário formatar esses dados para utilizá-los de forma a serem mostrados nos cards.

Primeiramente foi criado um tipo Stock que armazena a sigla da ação e um vetor de objetos que contém valor e timestamp\
E então, com um useEffect ouvindo toda mensagem enviada já parseada como JSON com uso da lib de websocket\
eu encontro a primeira chave do JSON enviado que for diferente de timestamp, já que eu sempre recebia uma chave contendo a ação que poderia ser qualquer uma e um timestamp e salvo ela em ticker para então procurar no histórico de mensagens a primeira ação com o mesmo nome de ticker\

Um dos problemas foi que o docker as vezes mandava a mesma ação varias vezes com o mesmo tempo, o que fazia com que o gráfico utilizado nos cards ficasse com várias linhas retas, isso foi filtrado dando push somente se o timestamp da ultima atualização fosse diferente da mensagem correndo no useEffect\

E para evitar problemas de memória no browser, caso o array de preços seja maior que 50, o primeiro elemento é removido para que mais um entre.

Por fim o histórico de mensagens é mapeado novamente para que a assinatura do vetor seja alterada forçando a renderização dele no gráfico.
