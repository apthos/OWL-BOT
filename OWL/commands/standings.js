const Discord = require('discord.js');
const request = require('request');
const teamFinder = require('./../teamFinder.js');

module.exports = {
	name: 'standings',
	description: 'Overwatch League Information!',
	usage: '!owl standings <team alias>',
	execute(message, args) {
		const url = "https://api.overwatchleague.com/rankings";

		//Finding team
		request(url, function(error, response, body){
			if (!error) {
				try {
					//Checks if the input is an alias of a team
					let team = teamFinder.find(args[0]);
					let teamName = '';
					if(team != undefined) {
						teamName = team[0];
					}
					else {
						throw "input was not a valid team name.";
					}

					//Turns html from request to an object
					let info = JSON.parse(body);						

					//Finds the team info and sends it to the message builder
					info.content.forEach(function (teamInfo) {
						if (teamInfo.competitor.name.toLowerCase().includes(teamName)) {
							sendStats(teamInfo)

						}

					});	
				} catch(err) {
					message.reply(err);
				}	
						

			}
			
		})

		function sendStats(team) {
			//Creates and sends embedded message with the standings info
			let embedTeam = new Discord.RichEmbed()
				.setColor('#'+team.competitor.primaryColor)
				.setThumbnail(team.competitor.logo)
				.setTitle(team.competitor.name)
				.addField('Standings','Placement: '+team.placement+'\nMatches Won: '+team.records[0].matchWin+'\nMatches Lost: '+team.records[0].matchLoss);
			message.channel.send(embedTeam);

		}

	}

};