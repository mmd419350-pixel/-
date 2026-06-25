import moment from 'moment-timezone';
import fs from 'fs';
import path from 'path';
export default {
    command: 'script',
    aliases: ['repo', 'sc'],
    category: 'info',
    description: 'Get information about the 𝙓𝙖𝙛𝙨𝙖𝙣 𝙓 𝙏𝙖𝙘𝙝 GitHub repository',
    usage: '.script',
    async handler(sock, message, args, context) {
        const chatId = context.chatId || message.key.remoteJid;
        try {
            const res = await fetch('https://api.github.com/repos/𝙓𝙖𝙛𝙨𝙖𝙣 𝙓 𝙏𝙖𝙘𝙝/𝙓𝙖𝙛𝙨𝙖𝙣 𝙓 𝙏𝙖𝙘𝙝');
            if (!res.ok)
                throw new Error('Error fetching repository data');
            const json = await res.json();
            let txt = `*乂  𝙓𝙖𝙛𝙨𝙖𝙣 𝙓 𝙏𝙖𝙘𝙝  乂*\n\n`;
            txt += `✩  *Name* : ${json.name}\n`;
            txt += `✩  *Watchers* : ${json.watchers_count}\n`;
            txt += `✩  *Size* : ${(json.size / 1024).toFixed(2)} MB\n`;
            txt += `✩  *Last Updated* : ${moment(json.updated_at).format('DD/MM/YY - HH:mm:ss')}\n`;
            txt += `✩  *URL* : ${json.html_url}\n`;
            txt += `✩  *Forks* : ${json.forks_count}\n`;
            txt += `✩  *Stars* : ${json.stargazers_count}\n\n`;
            txt += `💥 *𝙓𝙖𝙛𝙨𝙖𝙣 𝙓 𝙏𝙖𝙘𝙝*`;
            const imgPath = path.join(process.cwd(), 'assets/thumb.png');
            const imgBuffer = fs.readFileSync(imgPath);
            await sock.sendMessage(chatId, { image: imgBuffer, caption: txt }, { quoted: message });
        }
        catch (error) {
            console.error('Error in github command:', error);
            await sock.sendMessage(chatId, { text: '❌ Error fetching repository information.' }, { quoted: message });
        }
    }
};
