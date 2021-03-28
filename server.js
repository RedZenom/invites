const keep_alive = require("./keep_alive.js"); //index.js Const Kısımlarına

var http = require("http");

http
  .createServer(function(req, res) {
    res.write("sa");
    res.end();
  })
  .listen(8080);

///////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const ayarlar = require("./ayarlar.json");
const { promisify } = require("util");
const chalk = require("chalk");
require("./util/eventLoader")(client);
const moment = require("moment");
const db = require("quick.db");
const ms = require("parse-ms");

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut - ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on("message", async message => {
  if (message.author.id == "815706504651997264") {
    if (message.content === "gir") {
      client.emit(
        "guildMemberAdd",
        message.member || (await message.guild.fetchMember(message.author))
      );
    }
  } else {
    return;
  }
});

client.on("message", async message => {
  if (message.author.id == "815706504651997264") {
    if (message.content === "çık") {
      client.emit(
        "guildMemberRemove",
        message.member || (await message.guild.fetchMember(message.author))
      );
    }
  } else {
    return;
  }
});

client.on("guildMemberAdd", async member => {
  db.fetch(`dm_${member.guild.id}`).then(i => {
    if (i == "acik") {
      const msj = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${member.user.id}>Adlı kişi aramıza katıldı! Hoşgeldin..\n İyi vakit geçirmen dileğiyle!)`
        )
        .setFooter(client.user.username, client.user.avatarURL);

      member.send(msj);
    } else if (i == "kapali") {
    }
    if (!i) return;
  });
});

client.on("guildMemberRemove", async member => {
  db.fetch(`dm_${member.guild.id}`).then(i => {
    if (i == "acik") {
      let msj = new Discord.RichEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${member.user.id}> Aramızdan ayrıldı.\n Görüşmek üzere!\)`
        )
        .setFooter(client.user.username, client.user.avatarURL);

      member.send(msj);
    } else if (i == "kapali") {
    }
    if (!i) return;
  });
});

const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kişi aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
//////////////////////////////////////////////////////////////////////////////
client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let kanal = await db.fetch(`otokanal_${member.guild.id}`);
  let msj = await db.fetch(`otorolmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  member.addRole(rol);
  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `:loudspeaker: **@${member.user.tag}** adlı şahsa rolü verildi! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-rol-`, `${member.guild.roles.get(rol).name}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});
//////////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjhg_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (rol == member.guild.memberCount) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (rol < member.guild.memberCount) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`Tebrikler! başarılı bir şekilde ${rol} kişi olduk!`)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    db.delete(`sayaçhedef_${member.guild.id}`);
    db.delete(`sayaçkanal_${member.guild.id}`);
    db.delete(`sayaçmsjhg_${member.guild.id}`);
    db.delete(`sayaçmsjbb_${member.guild.id}`);
    return;
  }
  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `:loudspeaker: **@${
          member.user.tag
        }** adlı şahsa aramıza katıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});

///////////////////////////////////////

client.on("guildMemberAdd", async member => {
  let rol = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagk_${member.guild.id}`);
  let msj = await db.fetch(`ototagmsj_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    member.setNickname(`${rol} | ${member.user.username}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `:loudspeaker: **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-uye-`, `${member.user.username}`)
      .replace(`-tag-`, `${rol}`);
    member.setNickname(msj2);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `:loudspeaker: **@${member.user.tag}** adlı şahsa tag verildi!`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});


client.on("guildMemberRemove", async member => {
  let rol = await db.fetch(`sayaçhedef_${member.guild.id}`);
  let kanal = await db.fetch(`sayaçkanal_${member.guild.id}`);
  let msj = await db.fetch(`sayaçmsjbb_${member.guild.id}`);
  if (!rol) return;
  if (!kanal) return;

  if (!msj) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `:loudspeaker: **@${
          member.user.tag
        }** adlı şahsa aramızdan ayrıldı! ${rol} kişi olmamıza ${rol -
          member.guild.memberCount} kişi kaldı! :inbox_tray:`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  } else {
    var msj2 = msj
      .replace(`-sunucu-`, `${member.guild.name}`)
      .replace(`-uye-`, `${member.user.tag}`)
      .replace(`-uyetag-`, `<@${member.user.id}>`)
      .replace(`-hedef-`, `${rol}`)
      .replace(`-hedefkalan-`, `${rol - member.guild.memberCount}`);
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(msj2)
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(embed);
    return;
  }
});


client.on("guildCreate", async guild => {
  const embed = new Discord.RichEmbed()
    .setColor(`GREEN`)
    .setTitle(`EKLENDİM!`)
    .setDescription(
      `Sunucu Adı: ${guild.name}\nSunucu Id: ${guild.id}\nSunucu Sahibi: ${guild.owner}\nSunucudaki Kişi Sayısı: ${guild.memberCount}\nSunucu Oluşturulma Zamanı: ${guild.createdAt}\nDoğrulama Seviyesi: ${guild.verificationLevel}`
    );
  client.channels.get(`815706504651997264`).send(embed);
});
client.on("guildDelete", async guild => {
  const embed = new Discord.RichEmbed()
    .setColor(`RED`)
    .setTitle(`ATILDIM!`)
    .setDescription(
      `Sunucu Adı: ${guild.name}\nSunucu Id: ${guild.id}\nSunucu Sahibi: ${guild.owner}\nSunucudaki Kişi Sayısı: ${guild.memberCount}\nSunucu Oluşturulma Zamanı: ${guild.createdAt}\nDoğrulama Seviyesi: ${guild.verificationLevel}`
    );
  client.channels.get(`815706504651997264`).send(embed);
});

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);