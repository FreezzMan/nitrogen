const yt = require('ytdl-core');
const cmd = require('discord.js');
const bot = new cmd.Client();
const prefix = "!";

var servers = {};
bot.on('message', message =>
{
    if(message.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "test":
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection)
            {
                message.channel.sendMessage("Ceci est un test !");
            });
            break;
    
        default:
            break;
    }
});