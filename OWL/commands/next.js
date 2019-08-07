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
            if (!error) {    
                let info = JSON.parse(body);

                try {
                    //Finds the current stage
                    let stage = getStage(today, info);
                    
                    if (args.length == 0) {
                        //Finds next match
                        let matches = info.data.stages[stage].matches;
                        let match = binarySearchNext(matches, today, 0, matches.length - 1);
                        
                        let team1 = match.competitors[0];
                        let team2 = match.competitors[1];

                        sendMatch(team1, team2, match);

                    }
                    else {
                        //Checks if the input is a valid alias of a team
                        let team = teamFinder.find(args[0]);
                        let teamName = '';
                        teamName = team[0];

                        //Finds next match for the team
                        for (let counter = 0; counter < info.data.stages[stage].matches.length; counter++) {
                            let match = info.data.stages[stage].matches[counter];
                            let date = new Date(match.startDateTS);
                                
                            if ((today < date) && (match.competitors[0].name.toLowerCase() == teamName || match.competitors[1].name.toLowerCase() == teamName)) {
                                let team1 = match.competitors[0];
                                let team2 = match.competitors[1];
                                sendMatch(team1,team2,date,match);
                                break;

                            }

                        }

                    }

                }
                catch(err) {
                    message.reply(err);

                }

            }

        })

        function sendMatch(team1, team2, match) {
            let date = new Date(match.startDateTS);
            let embedMatch = new Discord.RichEmbed()
                .setTitle('Next Match')
                .addField(team1.name + ' vs ' + team2.name, 'Date: ' + date.toLocaleString())
                .setColor(team1.primaryColor)
                .setURL('https://overwatchleague.com/en-us/match/' + match.id);
            message.channel.send(embedMatch);
            
        }

        function getStage(today, info) {
            let stageEndDate = 0;
            let finalWeek = 0;

            for (let counter = 0; counter < info.data.stages.length; counter++) {
                finalWeek = info.data.stages[counter].weeks.length - 1;
                stageEndDate = info.data.stages[counter].weeks[finalWeek].endDate;
                
                if (stageEndDate > today) {
                    return counter;

                }

            }

            throw 'stage was not found.';
            
        }

        function binarySearchNext(matches, today, start, end) {
            if (matches.length > 0) {
                let mid = Math.floor((start + end) / 2);
                
                if ((matches[mid - 1].endDateTS <= today) && (today <= matches[mid].startDateTS)) {
                    return matches[mid];

                }

                if (matches[mid].startDateTS > today) {
                    return binarySearchNext(matches, today, start, mid - 1);

                }
                else {
                    return binarySearchNext(matches, today, mid + 1, end);

                }

            }
            else {
                throw 'no matches found.';

            }

        }
        
    }

};
