const Discord = require('discord.js');
const request = require('request');

module.exports = {
	name: 'stream',
	description: 'Overwatch League Livestream!',
	usage: '!owl stream',
	execute(message, args) {
		const url = "https://api.overwatchleague.com/v2/streams";

		//Finding team
		request(url, function(error, response, body){
			if (!error) {
				try {
                    let info = JSON.parse(body);
                    let stream = info.attributes.stream;

                    //Creates and sends embedded message with stream info		
			        let embedStream = new Discord.RichEmbed()
				        .setColor('#6441a5')
                        .setTitle(stream.stream_type.toUpperCase())
                        .setURL(stream.channel.url)
				        .addField('Overwatch League', stream.channel.status)
                        .setThumbnail(stream.channel.logo);
			        message.channel.send(embedStream);
                    
				} 
				catch(err) {
					message.reply(err);

				}		

			}
			
		})



	}

};
