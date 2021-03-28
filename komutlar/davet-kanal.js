const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a'";
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Vah Vah Vah Gariban Bu Komutu Kullanamıyoo.```")
    .setFooter("Developed By RedZenom")
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }

  let kanal = message.mentions.channels.first();

  if (!kanal) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen bir kanal belirtiniz!")
    .setFooter("Developed By RedZenom")
        .setColor("BLACK")
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setFooter("Developed By RedZenom")
    .setDescription(`Davet kanalı; ${kanal} olarak ayarlandı!`);
  message.channel.send(embed);

  db.set(`davetkanal_${message.guild.id}`, kanal.id);
};

module.exports.conf = {
  aliases: ["davetkanal"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-kanal",
  description: "davet-kanal",
  usage: "davet-kanal"
};
