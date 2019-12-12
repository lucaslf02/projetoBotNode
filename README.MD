Projeto criado para o trabalho de conclusão do curso de Ciência da Computação na Universidade cidade de São Paulo(Unicid), pelos alunos:

GABRIEL YVIS FEITOSA
LUCAS ARAUJO DA ROCHA
LUCAS LEMES FERREIRA
RAFAEL NOBERTO DE FRANÇA
WESLLEY DA SILVA ALVES

Sobre o projeto:

Foi criado uma API de chatbot para atendimento de hospitais utilizando os recursos de inteligência artificial do serviço Watson Assistant 
da IBM. 
O chatbot pode agendar exanes e consultas, consutar status de exames e consultas e tirar duvidas.

Tecnologias utilizdas:

- Node.JS
- SQL Server
- Watson Assitant

Funcionamento:

A cada mensagem que o usuário incluir no chat enviado para a API, a API por sua vez encaminha a mensagem para o serviço do Watson 
assintant, o Watson processa a mensagem e classifica qual seria a inteção do usuário, apos classificar a inteção o watson retornar essa
infomação para API, na API é processado a inteção do usuário e com isso será realizado alguma tarefa, que basicamente pode ser uma 
interação com o banco de dados(consultas ou inserção) ou retornar alguma mensagem ao usuário.





