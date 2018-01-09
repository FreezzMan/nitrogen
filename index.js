const cmd = require('discord.js');
const bot = new cmd.Client();
const yt = require('ytdl-core');
const prefix = "!";


bot.on('ready', () =>
{
    console.log('Nitrogen - Ok !');
});

bot.on('message', message =>
{
    if(message.equals(bot.user)) return;
    if(!message.content.startsWith(prefix)) return;

    str: []
    var args = message.content.substring(prefix.length).split(" ");
    function play(connection, message)
    {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(yt(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("end", function()
    {
        if(server.queue[0]) play(connection, message);
        else connection.disconnect();
    });
    }

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
        case "play":
                if(!args[1])
                {
                    message.reply(" Lien introuvable !");
                    return;
                }
                if(!message.member.voiceChannel)
                {
                    message.reply(" Vous devez être dans un chat vocal !");
                    return;
                }

                if(!servers[message.guild.id]) servers[message.guild.id] =
                {
                    queue: []
                };
                
                var server = servers[message.guild.id];
                server.queue.push(args[1])
                
                if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection)
                {
                    play(connection, message);
                    message.channel.sendMessage("Ceci est un test !");
                    return;
                });
            break;
        case "stop":
            var server = servers[message.guild.id];

            if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
            break;
        case "skip":
            var server = servers[message.guild.id];

            if(server.dispatcher) server.dispatcher.end();
            break;
        default:
            break;
    }
});
bot.login(process.env.TOKEN)

