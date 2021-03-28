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

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
           .setFooter("Developed By RedZenom")
        .setDescription("Lütfen davet eklenecek kişiyi etiketleyiniz!")
        .setColor("BLACK")
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.RichEmbed()
           .setFooter("Developed By RedZenom")
        .setDescription("Lütfen eklenecek davet sayısını giriniz.")
        .setColor("BLACK")
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setFooter("Developed By RedZenom")
    .setDescription(`${u} Adlı şahsa; ${m} davet eklendi!`);
  message.channel.send(embed);

  db.add(`davet_${u.id}_${message.guild.id}`, +m);
};

module.exports.conf = {
  aliases: ["davetekle"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-ekle",
  description: "davet-ekle",
  usage: "davet-ekle"
};
