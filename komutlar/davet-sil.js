const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a'";
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Vah Vah Vah Gariban Bu Komutu Kullanamıyoo.```")
      .setColor("BLACK")
    .setFooter("Developed By RedZenom")
    message.channel.send(embed);
    return;
  }

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen daveti silinecek kişiyi etiketleyiniz!")
        .setColor("BLACK")
    .setFooter("Developed By RedZenom")
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("Lütfen silinecek davet sayısını giriniz.")
        .setColor("BLACK")
    .setFooter("Developed By RedZenom")
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`${u} Adlı şahstan; ${m} davet silindi!`)
    .setFooter("Developed By RedZenom")
  message.channel.send(embed);

  db.add(`davet_${u.id}_${message.guild.id}`, -m);
};

module.exports.conf = {
  aliases: ["davetsil"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-sil",
  description: "davet-sil",
  usage: "davet-sil"
};
