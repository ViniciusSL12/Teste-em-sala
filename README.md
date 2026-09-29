# TechBlog

> **Tecnologia para entender o agora.**
>
> Um guia visual e interativo para explorar inteligência artificial, desenvolvimento web e programação.

O TechBlog é um site estático em português, feito com HTML, CSS e JavaScript puro. A página organiza conteúdos introdutórios sobre tecnologia em cartões fáceis de consultar e oferece busca instantânea e acompanhamento de leitura no próprio navegador.

## Visão geral

A página começa com uma apresentação do projeto e uma imagem temática. Na seção principal, três cartões apresentam áreas fundamentais da tecnologia, exemplos de ferramentas e links para navegar entre os assuntos.

| Tema | O que você encontra |
| --- | --- |
| Inteligência artificial | Chatbots, reconhecimento de imagens e automação de tarefas |
| Desenvolvimento web | HTML, CSS e JavaScript, com seus papéis na construção de sites |
| Programação | Java, Python e JavaScript, além de frameworks e ferramentas relacionados |

## Recursos

- **Busca instantânea:** encontre temas, linguagens e ferramentas enquanto digita. A busca não diferencia maiúsculas, minúsculas ou acentos.
- **Progresso de leitura:** marque cada tema como lido e acompanhe quantos faltam.
- **Progresso salvo:** o estado de leitura fica armazenado no `localStorage` deste navegador, mesmo depois de fechar ou recarregar a página.
- **Navegação por âncoras:** use o menu, os links dos cartões e os comandos para voltar ao início para percorrer a página.
- **Layout responsivo:** a grade e os controles se adaptam a telas menores.
- **Acessibilidade:** estrutura semântica, texto alternativo na imagem, link para pular ao conteúdo principal, foco visível e respeito à preferência por movimento reduzido.
- **Degradação graciosa:** os cartões e seus conteúdos continuam visíveis e legíveis mesmo se o JavaScript estiver desativado. Os controles interativos aparecem quando o script é inicializado.

## Tecnologias

- **HTML5** para a estrutura semântica e os metadados da página.
- **CSS3** para o sistema visual, os estados de interação e os layouts responsivos.
- **JavaScript** sem bibliotecas ou frameworks para a busca, o progresso e a persistência local.

O projeto não precisa de instalação de pacotes, compilação ou etapa de build.

## Estrutura do projeto

```text
.
├── index.html   # Conteúdo, navegação e estrutura da página
├── style.css    # Identidade visual, interações e responsividade
├── app.js       # Busca e acompanhamento de leitura
└── README.md    # Documentação do projeto
```

### Responsabilidade dos arquivos

- `index.html` contém o conteúdo dos temas e carrega a folha de estilos e o script. O JavaScript usa `defer`, então é executado depois da leitura do HTML.
- `style.css` define cores e tipografia, apresenta os temas em cartões e organiza a interface para diferentes larguras de tela.
- `app.js` filtra os cartões pelo texto, atualiza os botões e a barra de progresso e salva a lista de temas lidos no navegador.

## Como executar

Como não há etapa de build, você pode abrir `index.html` diretamente no navegador. Para testar por um servidor local, entre na pasta do projeto e execute:

```bash
python3 -m http.server 8000
```

Depois, acesse [http://localhost:8000](http://localhost:8000). Encerre o servidor com `Ctrl+C`.

## Como usar

1. Escolha um assunto pelo menu ou role até os cartões.
2. Digite um termo na busca para filtrar os temas. Experimente, por exemplo, `Python`, `imagens` ou `inteligencia`.
3. Use **Marcar como lido** para atualizar seu progresso. Clique novamente para desmarcar.
4. Navegue entre os cartões pelos links no rodapé de cada um.

## Personalização

### Editar um tema

O conteúdo dos cartões fica no elemento `<div class="topic-grid">` do `index.html`. Cada tema é um `<article class="topic-card">` com um identificador próprio, usado pela navegação interna.

Ao adicionar um cartão, mantenha um `id` exclusivo e, para integrá-lo ao progresso de leitura, inclua nele um botão com `data-read-toggle` e um texto com `data-read-label`. O script conta os cartões automaticamente e valida os identificadores salvos com base nos artigos existentes.

### Alterar a aparência

As principais cores e fontes estão declaradas como variáveis no começo do `style.css`, dentro de `:root`. Os cartões também têm variantes visuais: `topic-card--lime`, `topic-card--coral` e `topic-card--blue`.

### Limpar o progresso salvo

O navegador armazena os temas lidos sob a chave `techblog-read-topics`. Para reiniciar o progresso, remova essa chave no armazenamento local do site pelas ferramentas de desenvolvedor do navegador.

## Recursos externos

As fontes **DM Sans** e **Space Grotesk** são carregadas do Google Fonts. A imagem de abertura é servida pelo Unsplash. Sem conexão com a internet, o site continua utilizável, mas esses recursos externos podem não aparecer; fontes locais alternativas já estão definidas no CSS.

## Acessibilidade e compatibilidade

O site usa elementos HTML semânticos, rótulos acessíveis nos controles e mensagens de estado anunciadas por leitores de tela. A navegação pode ser feita por teclado, e as animações são reduzidas quando o sistema operacional solicita menos movimento.

O progresso depende do `localStorage` e é específico ao navegador e ao dispositivo em que foi marcado. Se o armazenamento estiver indisponível, a busca e o acompanhamento continuam funcionando durante a visita atual, mas o progresso não será mantido depois.