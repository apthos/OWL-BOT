const Discord = require('discord.js');
const next = require('./next.js');
const last = require('./last.js');
const standings = require('./standings.js');
const stream = require('./stream.js');
const commands = [next, last, standings, stream];

module.exports = {
    name: 'help',
    description: 'Help with commands',
    usage: '!owl help <command name> or !owl help for list of all commands',
    execute(message, args) {
        if(args.length == 0) {
            commands.forEach(function (command) {
                message.channel.send('**' + command.name.toUpperCase() + ':**'
                    + '\nDescription: ' + command.description
                    + '\nUsage: ' + command.usage);

            });

        }
        else {
            try {
                let commandName = '';
                commands.forEach(function (command) {
                    if (args == command.name) {
                        commandName = command.name;
                        break;

                    }

                });

                if (commandName != '') {
                    message.channel.send('**' + commandName.name.toUpperCase() + ':**'
                    + '\nDescription: ' + commandName.description
                    + '\nUsage: ' + commandName.usage);

                }
                else {
                    throw 'requested command was not found.';

                }
            
            }
            catch (err) {
                message.reply(err);
                
            }
           
        }

    }

}
