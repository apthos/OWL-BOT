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
        //Sends info of every command
        if(args.length == 0) {
            commands.forEach(function (command) {
                message.channel.send('**' + command.name.toUpperCase() + ':**'
                    + '\nDescription: ' + command.description
                    + '\nUsage: ' + command.usage);

            });

        }
        else {
            //Sends info for requested command
            try {
                let foundCommand = false;
                let requestedCommand = {};

                //Finds and grabs requested command
                commands.forEach(function (command) {
                    console.log(command.name.toUpperCase());
                    if (args[0] == command.name) {
                        foundCommand = true;
                        requestedCommand = command;

                    }

                });
                
                //Checks if command was found
                if (foundCommand) {
                    //Sends command info
                    message.channel.send('**' + requestedCommand.name.toUpperCase() + ':**'
                        + '\nDescription: ' + requestedCommand.description
                        + '\nUsage: ' + requestedCommand.usage);

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
