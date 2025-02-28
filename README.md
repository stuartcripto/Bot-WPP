# WhatsApp Group Bot

Este é um bot para WhatsApp que automatiza o envio de mensagens em grupos específicos usando a biblioteca `whatsapp-web.js`.

## 📌 Funcionalidades

- Conecta-se ao WhatsApp via QR Code.
- Lista todas as conversas e grupos disponíveis.
- Envia mensagens automaticamente para grupos que contêm um termo específico no nome.
- Permite disparo manual de mensagens pelo terminal.
- Agendamento de mensagens automáticas toda sexta-feira às 17h.

## 🚀 Instalação

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- WhatsApp instalado no celular

### Passos

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/whatsapp-group-bot.git
   cd whatsapp-group-bot
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Inicie o bot:
   ```sh
   node bot.js
   ```

4. Escaneie o QR Code exibido no terminal com o WhatsApp.

## ⚙️ Configuração

- O nome do grupo é filtrado pela palavra-chave `bot` (pode ser alterado no código).
- A mensagem pode ser personalizada dentro do script.
- Para envio manual, digite `enviar` no terminal.

## 🛠 Tecnologias utilizadas

- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [node-schedule](https://www.npmjs.com/package/node-schedule)
- Node.js

## 📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para contribuir!

---

✉️ Para dúvidas ou sugestões, entre em contato!
