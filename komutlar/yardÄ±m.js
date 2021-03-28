const Discord = require("discord.js"),
  db = require("quick.db");

exports.run = async (bot, message, args, tools) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "a'";
  const embed = new Discord.RichEmbed()
    .setDescription(`**Prefix**: __${prefix}__`)
    .addField(
      `Davetler`,
      `\`davet-kanal\`, \`davet-kanal-sıfırla\`, \`davet-ekle\`, \`davet-sıfırla\`, \`davet-sil\`, \`davet-stokla\`, \`invite\`, \`davet-oluştur\``
    )
    .addField(`Rütbeler`, `\`rütbe-ekle\`, \`rütbe-sil\`, \`rütbe-liste\``)

    .setColor("BLACK")
    .setFooter("Developed By RedZenom")
message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım"],
  permLevel: 0
};

exports.help = {
  name: "yardım"
};