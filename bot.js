


const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const useful = require('useful-tools');
const ms = require('parse-ms')
// DATABASE AYARI
/*
 <%if (bot.users.get(id).presence.status){%>
						<% if (bot.users.get(id).presence.status === 'online') {%>
			<img src="https://cdn.discordapp.com/emojis/532658353915297794.png" width="40" height="40" style="margin-left: 100px; margin-top: -140px;">
						<%}else if(bot.users.get(id).presence.status === 'offline'){%>
			<img src="https://cdn.discordapp.com/emojis/532658353340416010.png?v=1" width="40" height="40" style="margin-left: 140px; margin-top: -190px;">
						<%}else if (bot.users.get(id).presence.status === 'dnd'){%>
				<img src="https://cdn.discordapp.com/emojis/532658362031144987.png" width="40" height="40" style="margin-left: 140px; margin-top: -190px;">
						<%}else if(bot.users.get(id).presence.status === 'idle'){%>
						<img src="https://cdn.discordapp.com/emojis/551428323302047771.png" width="40" height="40" style="margin-left: 170px; margin-top: -170px;">
						<%} %>  
        <% } %>
        */


client.ayar = db; 
// DATABASE AYARI
client.htmll = require('cheerio');
client.useful = useful;
client.tags = require('html-tags');

let profil = JSON.parse(fs.readFileSync('./profil.json', 'utf8')) // PROFIL KAYIT
client.profil = profil

client.ayarlar = {
  "prefix": "!",
  "oauthSecret": "jVUJBOmRa85zyTiP6tqWqkw_jQzRXKsb",
	"callbackURL": "https://pink-dawn-bot-list/callback", 
	"kayıt": "642464400682516480",
  "renk": "1ED760" 
};
0   
client.admin = ["645716824272666654","645716824272666654"]

client.on('ready', async message => {
  
  
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);
  
  
   require("./app.js")(client);
  
  client.user.setActivity(``, { type:"STREAMING" })
  
  console.log("Site ve Bot Aktif Oldu Artik Sistem Son Hizla Calisiyor!")

});



// OYNUYOR




setInterval(() => {

  
}, 10000);
//`Sistemimizde ${sayi.length} Bot Mevcut`

  


client.on("guildMemberAdd", member => {
      if (member.user.bot === true) {
          member.addRole(member.guild.roles.find(r=>r.name==='Approved Bots').id) //bot rolü
       }
});

const chalk = require('chalk')

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir(`./src/komutlar/`, (err, files) => {
	let jsfiles = files.filter(f => f.split(".").pop() === "js")

	if(jsfiles.length <= 0) {
		console.log("Olamazz! Hiç komut dosyası bulamadım!")
	} else {
		if (err) {
			console.error("Hata! Bir komutun name veya aliases kısmı yok!")
		}
		console.log(`${jsfiles.length} komut yüklenecek.`)

		jsfiles.forEach(f => {
			let props = require(`./src/komutlar/${f}`)
			client.commands.set(props.help.name, props)
			props.conf.aliases.forEach(alias => {
				client.aliases.set(alias, props.help.name)
			})
			console.log(`Yüklenen komut: ${props.help.name}`)
		})
	}
});

client.on("message", async message => {

	if (message.author.bot) return
	if (!message.content.startsWith('!')) return
	var command = message.content.split(' ')[0].slice('!'.length)
	var args = message.content.split(' ').slice(1)
	var cmd = ''

	if (client.commands.has(command)) {
		var cmd = client.commands.get(command)
	} else if (client.aliases.has(command)) {
		var cmd = client.commands.get(client.aliases.get(command))
	}
  
  
	if (cmd) {
    if (cmd.conf.permLevel === 'ozel') { 
      if (client.yetkililer.includes(message.author.id) === false) {
				message.channel.send("Yetersiz Yetki.")
				return
      }
    }
    
		if (cmd.conf.permLevel === 1) {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) {
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 2) {
			if (!message.member.hasPermission("KICK_MEMBERS")) {
				message.channel.send("Üyeleri atma yetkin yok.")
				return
			}
		}
		if (cmd.conf.permLevel === 3) {
			if (!message.member.hasPermission("ADMINISTRATOR")) {
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.permLevel === 4) {
			const x = await client.fetchApplication()
      var arr = [x.owner.id, "419363424733102080", '419363424733102080']
			if (!arr.includes(message.author.id)) {
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
    		if (cmd.conf.permLevel === 5) {
			const x = await client.fetchApplication()
      var arr = [x.owner.id, '419363424733102080']
			if (!arr.includes(message.author.id)) {
				message.channel.send("Yetersiz yetki.")
				return
			}
		}
		if (cmd.conf.enabled === false) {
			message.channel.send("Bu komut devre dışı.")
			return
		}
		if(message.channel.type === "dm") {
			if (cmd.conf.guildOnly === true) {
				message.channel.send("Bu komutu özel mesajlarda kullanamazsın.")
				return
			}
		}
		cmd.run(client, message, args)
	}
});




client.on("guildMemberAdd", member => {
  if (!member.guild.id == "637589485797769230") return
  if (member.user.bot === true) {
          member.addRole(member.guild.roles.find(r=>r.name==='ONAYLANMIŞ BOTLAR').id) //bot rolü
       } else {
          member.addRole(member.guild.roles.find(r=>r.name==='Üye').id) //üye rolü
       }
});

client.on('guildDelete', guild => {

  
  const sid = guild.id;
  
   db.delete(`sunucu.${sid}`)
  
    
    client.channels.get(`632240251389214740`).send(`**${guild.name}** adlı sunucu siteden çıkartıldı.`)
  
});




client.on('guildCreate', async guild => {
  
  const sid = guild.id;
 
client.channels.get(client.guilds.find('id', `${sid}`).channels.random().id).createInvite().then((invite) => db.set(`sunucu.${sid}.davet`, `${invite.url}`))
  
   db.set(`sunucu.${sid}.id`, guild.id)
   db.set(`sunucu.${sid}.ismi`, guild.name)
   db.set(`sunucu.${sid}.sahip`, `${guild.owner.user.tag}`)
  db.set(`sunucu.${sid}.sahipid`, `${guild.owner.user.id}`)
   db.set(`sunucu.${sid}.kullanicisayi`, guild.memberCount)
   db.set(`sunucu.${sid}.avatar`, `${guild.iconURL}`)
   db.set(`sunucu.${sid}.bolge`, guild.region)
   db.set(`sunucu.${sid}.olusturma`, guild.createdAt)
   db.set(`sunucu.${sid}.emojisayisi`, guild.emojis.size)
   db.set(`sunucu.${sid}.durum`, 'Onaylı')
  
    client.channels.get(`640263685243404290`).send(`**${guild.name}** adlı sunucu başarılı bir şekilde siteye eklendi. \nhttp://light-bot-list.glitch.me/servers/${guild.id}`)
  
});





client.login("NjQ1OTkwMzY5ODA0Mjg4MDEw.XdKnzQ.Mw1m5ZjmAiryBdhRLeu_9gRuU8g")

process.env = {}
process.env.TOKEN = "NjQ1OTkwMzY5ODA0Mjg4MDEw.XdKnzQ.Mw1m5ZjmAiryBdhRLeu_9gRuU8g"; // TUM DOSYALARDA CLIENT TOKEN