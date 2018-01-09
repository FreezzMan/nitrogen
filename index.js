const cmd = require('discord.js');
const bot = new cmd.Client();
const prefix = "!";

bot.music = require('./music.js');

bot.on('ready', () =>
{
    console.log('Nitrogen - Ok !');
});

bot.on('message', message =>
{
    if(message.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    const str = [];
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "help":
            message.channel.send
            ({
                embed:
                {
                    color: 16711680,
                    author:
                    {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: "__Liste des commandes:__",
                    description: "**add** \n **remove** \n **view** \n **test**",
                    fields:
                    [{
                        name: "__Préfix__:",
                        value: "Le préfix est **!**",
                    }],
                    timestamp: new Date(),
                    footer: 
                    {
                        icon_url: bot.user.avatarURL,
                        text: "Envoyé" 
                    }
                }
            })

            break;
        case "add":

            if(!args[1])
            {
                message.reply(" Ajouter un mot à cencsurer !");
                return;
            }
            
            if(str.indexOf(args[1]) !== -1)
            {
                message.reply(" ce mot existe déjà");
                return;
            }else{
                str.push(args[1]);
                message.reply(" "+args[1]+" à bien été ajouter !");
                return;
            }
            
            break;
        case "remove":
        if(!args[1])
        {
            message.reply(" Ajouter un mot à supprimer !");
            return;
        }
        if(str.indexOf(args[1], str) === -1)
        {
            message.reply(" ce mot n'existe pas !");
            return;
        }else{
            str.splice(args[1]);
            message.reply(" "+args[1]+" à bien été supprimer !");
            return;
        }
            break;
        case "view":
            if(str.length === 0)
            {
                message.reply(" C'est vide !");
                return;
            }else{
                message.reply(" "+str.join(", "));
                return;
            }
        break;
        case "test":
                if(!message.channel.voiceChannel)
                {
                    message.reply(" Vous devez être dans un chat vocal !");
                    return;
                }

                var server = servers[message.guild.id];

                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection)
                {
                    message.channel.sendMessage("Ceci est un test !");
                    return;
                });
            break;
        default:
            break;
    }
});
bot.login(process.env.TOKEN)

