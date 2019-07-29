const {prefix, clientID} = require('./config.json');
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//Obtains command files and sets commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);

}

client.once('ready', () => {
    console.log('Ready!');

});

client.on('message', message => {
    //Throws away non-prefixed messages
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    //Obtains the arguments and commands in the message
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    //Verifies arguments
    if (!client.commands.has(commandName)) {
        message.reply('a valid command wasn\'t added! Use \'!owl help\' for a list of commands.');
        return;

    }

    //Obtains and executes command
    const command = client.commands.get(commandName);
    try {
        command.execute(message, args);

    } catch(error) {
        console.error(error);
        message.reply('an error has occured while executing the command!');

    }
    
});

client.login(clientID);