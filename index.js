const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const schedule = require('node-schedule');
const readline = require('readline');

// Inicializa o cliente WhatsApp Web
const client = new Client({
    authStrategy: new LocalAuth()
});

// Exibe o QR Code no terminal
client.on('qr', qr => {
    console.log('Escaneie este QR Code para conectar:');
    qrcode.generate(qr, { small: true });
});

// Confirma conexão
client.on('ready', async () => {
    console.log('✅ Bot conectado ao WhatsApp!');

    // Aguardar 5 segundos para garantir o carregamento das conversas
    setTimeout(async () => {
        const chats = await client.getChats();
        if (chats.length === 0) {
            console.log("⚠️ Nenhuma conversa carregada. Aguarde um pouco mais ou tente reiniciar o bot.");
            return;
        }

        console.log("🔍 Listando todas as conversas...");
        chats.forEach(chat => console.log(`📌 Nome: ${chat.name} | Grupo: ${chat.isGroup}`));

        console.log("🔍 Conversas disponíveis:");
        chats.forEach(chat => console.log(`- ${chat.name}`));

        if (chats.length === 0) {
            console.log("⚠️ Nenhuma conversa encontrada! Verifique se o bot está em alguma conversa.");
        }
    }, 5000);

    // Nome parcial da conversa
    const chatKeyword = "Nome do grupo".toLowerCase();  // Busca conversas que contenham essa palavra
    
    // Mensagem a ser enviada
    const message = `Escreva o texto desejado`;

    // Agendar envio toda sexta-feira às 17h
    schedule.scheduleJob('0 17 * * 5', async () => {
        await sendMessage(chatKeyword, message);
    });

    console.log('⏳ Automação configurada para toda sexta-feira às 17h.');

    // Interface para disparo manual
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (input) => {
        if (input.trim().toLowerCase() === 'enviar') {
            console.log('🔵 Disparando mensagem manualmente...');
            await sendMessage(chatKeyword, message);
        }
    });

    console.log("💡 Digite 'enviar' no terminal para disparar a mensagem manualmente.");
});

// Função para enviar mensagem
async function sendMessage(chatKeyword, message) {
    const chats = await client.getChats();
    const chat = chats.find(chat => chat.name.toLowerCase().includes(chatKeyword));
    
    if (chat) {
        await chat.sendMessage(message);
        console.log(`✅ Mensagem enviada para a conversa: ${chat.name}`);
    } else {
        console.log('❌ Conversa não encontrada! Verifique o nome e tente novamente.');
        console.log("📋 Conversas disponíveis:");
        chats.forEach(chat => console.log(`- ${chat.name}`));
    }
}

// Inicializa o cliente
client.initialize();
