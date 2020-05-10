const Discord = require('discord.js');
let kanal = "642459480004493312"


exports.run = function(client, message) {
  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`).then(msg => msg.delete(10000))
    if (message.channel.id == kanal) {
 
  var role = message.guild.roles.find(role => role.name === "JavaScript"); // verilecek rol ismi (isterseniz "role.name" yerine "role.id" yapıp "ROL" yazan yere rol id de yazabilirsiniz.
  if (message.member.roles.has(role.id)) return message.channel.send(" Zaten bu role sahipsin :/")
  message.member.addRole(role);
  message.channel.send(`JavaScript rolü başarıyla verildi.  `);
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'js',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};
 