const Discord = require('discord.js');
const request = require('request');
const teamFinder = require('./../teamFinder.js');

module.exports = {
    name: 'next',
    description: 'Next Match!',
    usage: '!owl next or !owl next <team alias>',
    execute (message,args) {
        const today = Date.now();
        const url = 'https://api.overwatchleague.com/schedule';

        request(url, function(error, response, body) {
            //Turns html to an object
            let info = JSON.parse(body);

            //Finds the current stage
            let stage = 0;
            try {
                stage = getStage(today, info);

            } 
            catch(err) {
                message.reply(err);

            }
            
            if (args.length == 0) {
                //Finds next match
                for (let counter = 0; counter < info.data.stages[stage].matches.length; counter++) {
                    let match = info.data.stages[stage].matches[counter];
                    let date = new Date(match.startDateTS);
                    
                    if (today < date) {
                        let team1 = match.competitors[0];
                        let team2 = match.competitors[1];
                        sendMatch(team1,team2,date,match);
                        break;

                    }

                }

            }
            else {
                //Finds team & next match
                try {
					//Checks if the input is a valid alias of a team
					let team = teamFinder.find(args[0]);
					let teamName = '';
					if(team != undefined) {
                        teamName = team[0];

					}
					else {
                        throw 'input was not a valid team name.';
                        
                    }
                    
                    //Finds next match for the team
                    for (let counter = 0; counter < info.data.stages[stage].matches.length; counter++) {
                        let match = info.data.stages[stage].matches[counter];
                        let date = new Date(match.startDateTS);
                        
                        if ((today < date) && (match.competitors[0].name.toLowerCase() == teamName || match.competitors[1].name.toLowerCase() == teamName)) {
                            let team1 = match.competitors[0];
                            let team2 = match.competitors[1];
                            sendMatch(team1,team2,date,match);
                            console.log((Date.now() - today)/1000);
                            break;

                        }

                    }

                } catch(err) {
                    message.reply(err);

                }

            }

        })

        function sendMatch(team1,team2,date,match) {
            let embedDate = new Discord.RichEmbed()
                .setTitle('Next Match')
                .addField(team1.name+' vs '+team2.name, 'Date: '+date.toLocaleString())
                .setColor(team1.primaryColor)
                .setURL('https://overwatchleague.com/en-us/match/'+match.id);
            message.channel.send(embedDate);
        }

        function getStage(today, info) {
            for (let counter = 0; counter < info.data.stages.length; counter++) {
                if (counter > 0) {
                    if ((info.data.stages[counter-1].weeks[0].endDate < today) && (info.data.stages[counter].weeks[4].endDate > today)) {
                        return counter;
                    }
                }
                else {
                    if(info.data.stages[counter].weeks[4].endDate > today) {
                        return counter;
                    }
                
                }

            }
            throw 'stage was not found.';
            
        }
        
    }

};