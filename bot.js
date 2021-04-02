const { MessageEmbed } = require("discord.js");
const request = require("request");
const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const ms = require('ms');//
const tags = require('common-tags');
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix
const güvenlix = ayarlar.güvenli
const sunucu = ayarlar.sunucuID
const logkanal = ayarlar.guardlog
const arr = ayarlar.perm
const botrole = ayarlar.botrole
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
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

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);

//-----------------------TAG----------------------\\
client.on("message", message => {
    if(message.content.toLowerCase() == "tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "!tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "-tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "h!tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "h?tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "!!tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "?tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "h-tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "h.tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "..tag") 
    return message.channel.send(`⍣`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "tag ney") 
    return message.channel.send(`⍣`)
});

//-----------------------SA AS----------------------\\
client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});;

client.on("message", message => {
    if(message.content.toLowerCase() == "merhaba") 
    return message.channel.send(`**Merhaba Selam, Hoş Geldin Nasılsın?**`)
});;

client.on("message", message => {
    if(message.content.toLowerCase() == "cümleten sa") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "s.a") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "mrb") 
    return message.channel.send(`**Merhaba, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "slm") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selamun aleyküm") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selamın aleyküm") 
    return message.channel.send(`**Aleyküm Selam, Hoş Geldin Nasılsın?**>`)
});

//-----------------------OTO ROL ----------------------\\
client.on("guildMemberAdd", member => {
  member.roles.add('814859471817932831');
});



//------------------------HOŞ GELDİN-----------------------\\
client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:aveng_0:815200288146980904>`,
            '1': `<a:aveng_1:815200267975917568>`,
            '2': `<a:aveng_2:815200289257685032>`,
            '3': `<a:aveng_3:815200289287176192>`,
            '4': `<a:aveng_4:815200289668726858>`,
            '5': `<a:aveng_5:815200290231812107>`,
            '6': `<a:aveng_6:815200291184050177>`,
            '7': `<a:aveng_7:815200293935513630>`,
            '8': `<a:aveng_8:815200293200855061>`,
            '9': `<a:aveng_9:815200292794400779>`}[d];})}
  
      const kanal = member.guild.channels.cache.find(r => r.id === "814859551610241084");
      let register = '814859436950552596'
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = '<a:aveng_no:815200955666399303> `Güvenilir Değil.`'
  if (kurulus > 1296000000) kontrol = '<a:aveng_yes:815200956059877396> `Güvenilir Gözüküyor.`'
    moment.locale("tr");
  const embed = new Discord.MessageEmbed()
  .setAuthor(member.guild.name, member.guild.iconURL({dynamic:true}))
  .setColor("#000000")
  .setDescription(`<@`+member.id+`> **Kayarak Sunucuya Katıldı !** 
  
  **Kayıt Olmak İçin,** \` V.Confirmed \` **Kanallarına Geç.**
  
  <@&814859436950552596> **Yetlilere Teyit Vermen Yeterli.**
  
  **Seninle Birlikte** `+üyesayısı+` **Kişiye Ulaştık !**
  
  **Hesap Kuruluş Tarihi:** \``+gecen+`\`
  **Bu Kullanıcı:** `+kontrol+`
  
  **Sunucumuzun Tagını** (\` ⍣ \`) **Alarak Bizlere Destek Olabilirsin**`)
  .setImage(`https://media.discordapp.net/attachments/654649891490103297/756111347128729670/original.gif`)
  kanal.send(embed)
  kanal.send(`<@`+member.id+`> \`⍣\` <@&${register}> `)
});

//------------------------ŞÜPHELİ-----------------------\\
client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("Birkaç Saniye Önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "814859471817932831") 
     var rol = member.guild.roles.cache.get("814859486506123275s") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('<a:aveng_ok1:815200926570512405> **Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.**')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//-----------------------TAG ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('798149707535745064'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = "⍣"; // Buraya Ekip Tag
  var ekipRolü = "814859463508492288"; // Buraya Ekip Rolünün ID
  var logKanali = "814859581389275188"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      await logKanali.send(`${yeni}`)
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}**`);
      await logKanali.send(`${yeni}`)
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});





// TAG ROL OTO
  client.on("guildMemberAdd", member => {
    let sunucuid = "798149707535745064"; 
    let tag = "⍣"; 
    let rol = "814859463508492288"; 
    let tags = "814859581389275188";
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<@${member.id}> **Adlı Kullanıcı'da Zaten Tagımız Varmış !! \nO Doğuştan Biz'den Birisi.**`)
        .setTimestamp()
       client.channels.cache.get(tags).send(tagalma)
  }
  })













//////////////////////////////////////////////////////////////////////////////


// SAĞ TIK BAN KORUMASI     
client.on("guildBanAdd", async (guild, user) => {
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!güvenlix.includes(id)) {
let users = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(client.user.id);
users.kick()
const embed = new MessageEmbed()
.setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Üyeyi Yasakladı.
**__Yasaklanan Kullanıcı Bilgisi__**
\`Kullanıcı:\` ${target}
\`ID:\` ${target.id}
\`Tag:\` ${target.tag}

**__Yasaklayan Kullanıcı Bilgisi__**
\`Kullanıcı:\` ${users}
\`ID:\` ${users.id}
\`Tag:\` ${users.user.tag}

**__Rol Bilgisi__**
\`Rol:\` <@&${ayarlar.jailrole}>
\`ID:\` ${ayarlar.jailrole}

**${users.user.tag}** Kullanıcısının Sunucuda Kickledim.`)
client.channels.cache.get(logkanal).send(embed)
}})

// KANAL AÇMA KORUMASI
client.on("channelCreate", async (channel) => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
  if(logs.entries.first().action === `CHANNEL_CREATE`) {
  const id = logs.entries.first().executor.id;
  if(!güvenlix.includes(id)) {
  const users = guild.members.cache.get(id);
  const kullanici = guild.members.cache.get(client.user.id);    
    users.kick()
    channel.delete()
    const embed = new MessageEmbed()
    .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Kanal Oluşturdu.
    **__Kullanıcı Bilgisi__**
    \`Kullanıcı:\` ${users}
    \`ID:\` ${users.id}
    \`Tag:\` ${users.user.tag}
    
    **__Kanal Bilgisi__**
    \`Kanal:\` #${channel.name}
    \`ID:\` ${channel.id} 
    
    **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
    Oluşturulan **${channel.name}** Kanalını Sildim.`)
    client.users.cache.get(channel.guild.ownerID).send(embed)
  }}})})

// KANAL SİLME KORUMASI
client.on("channelDelete", async (channel) => {
  const guild = channel.guild;
  guild.fetchAuditLogs().then(async (logs) => {
  if (logs.entries.first().action === `CHANNEL_DELETE`) {
  const id = logs.entries.first().executor.id;
  if (!güvenlix.includes(id)) {
  const users = guild.members.cache.get(id);
  const kullanici = guild.members.cache.get(client.user.id);
 
    users.kick()
    await channel.clone().then(async kanal => {
      if (channel.parentID != null) await kanal.setParent(channel.parentID);
      await kanal.setPosition(channel.position);
      if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
    });
    const embed = new MessageEmbed()
    .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Kanal Sildi.
    **__Kullanıcı Bilgisi__**
    \`Kullanıcı:\` ${users}
    \`ID:\` ${users.id}
    \`Tag:\` ${users.user.tag}
    
    **__Kanal Bilgisi__**
    \`Kanal:\` #${channel.name}
    \`ID:\` ${channel.id} 
    
    **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
    Silinen **${channel.name}** Kanalını Tekrar Oluşturdum.`)
    client.channels.cache.get(logkanal).send(embed)
  }}})})


  // rol silme 
  client.on("roleDelete", async (role) => {
    const guild = role.guild;
    let sil = guild.roles.cache.get(role.id);
    guild.fetchAuditLogs().then(async (logs) => {
    if(logs.entries.first().action === `ROLE_DELETE`) {
    const id = logs.entries.first().executor.id;
    if(!güvenlix.includes(id)) {
    const users = guild.members.cache.get(id);
    const kullanici = guild.members.cache.get(client.user.id);
    let yeniRol = await role.guild.roles.create({
      data: {
        name: role.name,
        color: role.hexColor,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
      }
    });
users.kick()
      const embed = new MessageEmbed()
      .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Rol Sildi.
      **__Kullanıcı Bilgisi__**
      \`Kullanıcı:\` ${users}
      \`ID:\` ${users.id}
      \`Tag:\` ${users.user.tag}
      
      **__Rol Bilgisi__**
      \`Rol:\` @${role.name}
      \`ID:\` ${role.id} 
      \`HexColor:\` ${role.hexColor} 
     
      **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
      Silinen **${role.name}** Rolünü Tekrar Oluşturdum.`)
      client.channels.cache.get(logkanal).send(embed)
    }}})})

// rol oluşturma
client.on("roleCreate", async (role) => {
  let guild = role.guild;
  guild.fetchAuditLogs().then(async (logs) => {
  if(logs.entries.first().action === `ROLE_CREATE`) {
  let id = logs.entries.first().executor.id;
  if(!güvenlix.includes(id)) {
  let users = guild.members.cache.get(id);
  let kullanici = guild.members.cache.get(client.user.id);
  role.delete();
 users.kick()
    const embed = new MessageEmbed()
    .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Rol Oluşturdu.
    **__Kullanıcı Bilgisi__**
    \`Kullanıcı:\` ${users}
    \`ID:\` ${users.id}
    \`Tag:\` ${users.user.tag}
    
    **__Rol Bilgisi__**
    \`Rol:\` @${role.name}
    \`ID:\` ${role.id} 
    \`HexColor:\` ${role.hexColor} 
   
    **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
    Oluşturulan **${role.name}** Rolünü Sildim.`)
    client.channels.cache.get(logkanal).send(embed)
  }}})})


  // rol düzenleme koruma
  client.on("roleUpdate", async (oldRole, newRole) => {
    let guild = newRole.guild;
    guild.fetchAuditLogs().then(async (logs) => {
    if(logs.entries.first().action === `ROLE_UPDATE`) {
let id = logs.entries.first().executor.id;
  if(!güvenlix.includes(id)) {
  let users = guild.members.cache.get(id);
    if (arr.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
      newRole.setPermissions(oldRole.permissions);
      newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
    };
    newRole.edit({
      name: oldRole.name,
      color: oldRole.hexColor,
      hoist: oldRole.hoist,
      permissions: oldRole.permissions,
      mentionable: oldRole.mentionable
    });
      users.kick()
      const embed = new MessageEmbed()
      .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Rol Düzenledi.
      **__Kullanıcı Bilgisi__**
      \`Kullanıcı:\` ${users}
      \`ID:\` ${users.id}
      \`Tag:\` ${users.user.tag}
      
      **__Düzenlenen Rol Bilgisi__**
      \`Rol:\` @${newRole.name}
      \`ID:\` ${newRole.id} 
      \`HexColor:\` ${newRole.hexColor} 
     
      **__Eski Haline Getirilen Rol Bilgisi__**
      \`Rol:\` @${oldRole.name}
      \`ID:\` ${oldRole.id} 
      \`HexColor:\` ${oldRole.hexColor} 

      **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
      Düzenlenen **${oldRole.name}** Rolünü Eski Haline Getirdim.`)
      client.channels.cache.get(logkanal).send(embed)
    }}})})

    // kanal düzenleme koruma
    client.on("channelUpdate", async (oldChannel, newChannel) => {
      let guild = newChannel.guild;
      guild.fetchAuditLogs().then(async (logs) => {
      if(logs.entries.first().action === `CHANNEL_UPDATE`) {
  let id = logs.entries.first().executor.id;
    if(!güvenlix.includes(id)) {
    let users = guild.members.cache.get(id);
      if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
      if (newChannel.type === "category") {
        newChannel.edit({
          name: oldChannel.name,
        });
      } else if (newChannel.type === "text") {
        newChannel.edit({
          name: oldChannel.name,
          topic: oldChannel.topic,
          nsfw: oldChannel.nsfw,
          rateLimitPerUser: oldChannel.rateLimitPerUser
        });
      } else if (newChannel.type === "voice") {
        newChannel.edit({
          name: oldChannel.name,
          bitrate: oldChannel.bitrate,
          userLimit: oldChannel.userLimit,
        });
      };
      oldChannel.permissionOverwrites.forEach(perm => {
        let thisPermOverwrites = {};
        perm.allow.toArray().forEach(p => {
          thisPermOverwrites[p] = true;
        });
        perm.deny.toArray().forEach(p => {
          thisPermOverwrites[p] = false;
        });
        newChannel.createOverwrite(perm.id, thisPermOverwrites);
      });
      users.kick()
        const embed = new MessageEmbed()
        .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Kanal Düzenledi.
        **__Kullanıcı Bilgisi__**
        \`Kullanıcı:\` ${users}
        \`ID:\` ${users.id}
        \`Tag:\` ${users.user.tag}
        
        **__Düzenlenen Kanal Bilgisi__**
        \`Rol:\` #${newChannel.name}
        \`ID:\` ${newChannel.id} 
       
        **__Eski Haline Getirilen Kanal Bilgisi__**
        \`Rol:\` #${oldChannel.name}
        \`ID:\` ${oldChannel.id} 
  
        **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
        Düzenlenen **${oldChannel.name}** Kanalını Eski Haline Getirdim.`)
        client.channels.cache.get(logkanal).send(embed)
    }}})})

// weebhok koruma 
    client.on("webhookUpdate", async (channel) => {
      let guild = channel.guild;
      guild.fetchAuditLogs().then(async (logs) => {
      if (logs.entries.first().action === `WEBHOOK_CREATE`) {
      let yetkili = logs.entries.first().executor;
      let id = logs.entries.first().executor.id;
      if (!güvenlix.includes(id)) {
      let users = guild.members.cache.get(id);
      let kullanic = guild.members.cache.get(client.user.id);
      users.kick()
      const embed = new MessageEmbed()
      .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Bir Webhook (Açtı - Düzenledi - Sildi).
      **__Kullanıcı Bilgisi__**
      \`Kullanıcı:\` ${users}
      \`ID:\` ${users.id}
      \`Tag:\` ${users.user.tag}
      
      **__Webhook Bilgisi__**
      \`Webhook Kanalı:\` #${channel.name}
     
      **${users.user.tag}** Kullanıcısının Tüm Rollerini Alıp Jaile Gönderdim
      `)
      client.channels.cache.get(logkanal).send(embed)
      }}})})

/// bot koruma
      client.on("guildMemberAdd", async (member) => {
        const guild = member.guild;
        guild.fetchAuditLogs().then(async (logs) => {
        if(logs.entries.first().action === `BOT_ADD`) {
        const id = logs.entries.first().executor.id;
        if(!güvenlix.includes(id)) {
        if(member.user.bot){
        const users = guild.members.cache.get(id);
        const kullanici = guild.members.cache.get(client.user.id);
        users.kick()
          const embed = new MessageEmbed()
      .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Sunucuya Bir Bot Ekledi.
      **__Kullanıcı Bilgisi__**
      \`Kullanıcı:\` ${users}
      \`ID:\` ${users.id}
      \`Tag:\` ${users.user.tag}
      
      **__Eklenen Bot Bilgisi__**
      \`Bot:\` ${member}
      \`ID:\` ${member.id}
      \`Tag:\` ${member.user.tag}

      **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
      Eklenen **${member.user.tag}** Botunu Sunucudan Yasakladım.
      `)
      member.ban()
      client.channels.cache.get(logkanal).send(embed)
        }}}})})

        // sunucu koruma
        client.on("guildUpdate", async (oldGuild, newGuild) => {
          let guild = newGuild.guild
      let logs = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'})
      let yetkili = logs.entries.first().executor;
      let id = logs.entries.first().executor.id;
      if (!güvenlix.includes(id)) {
      let users = guild.members.cache.get(id);
      let kullanic = guild.members.cache.get(client.user.id);
          if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
          if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
         users.kick()
            const embed = new MessageEmbed()
        .setDescription(`${users} (\`${users.id}\`) Kullanıcısı Sunucu Ayarlarında Değişiklilik Yaptı.
        **__Kullanıcı Bilgisi__**
        \`Kullanıcı:\` ${users}
        \`ID:\` ${users.id}
        \`Tag:\` ${users.user.tag}
         
        **${users.user.tag}** Kullanıcısının Sunucuda Kickledim.
        Sunucuyu Eski Haline Getirdim
        `)
        client.channels.cache.get(logkanal).send(embed)
          }}) 








///////////////////////////////////////////////////////////////////////////
//--------------------------------------------------SA AS------------------------------------------------------\\

client.on("message", message => {
    if(message.content.toLowerCase() == "sa") 
    return message.channel.send(`${message.author}, **Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "selam") 
    return message.channel.send(`${message.author}, **Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "merhaba") 
    return message.channel.send(`${message.author}, **Merhaba, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "cümleten sa") 
    return message.channel.send(`${message.author}, **Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "s.a") 
    return message.channel.send(`${message.author}, **Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "mrb") 
    return message.channel.send(`${message.author}, **Merhaba, Hoş Geldin Nasılsın?**`)
});

client.on("message", message => {
    if(message.content.toLowerCase() == "slm") 
    return message.channel.send(`${message.author}, **Aleyküm Selam, Hoş Geldin Nasılsın?**`)
});

//--------------------------------------------------AFK------------------------------------------------------\\
client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});



//--------------------------------------------------CEZALI------------------------------------------------------\\
client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === "Jailed");
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.JailCezalıRol)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan Açıldı.`)
    member.roles.remove('814859484827615243');
  }, ms(sürejail));
}
})



//--------------------------------------------------MUTE------------------------------------------------------\\
client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "Muted");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.MuteliRol)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten Açıldı.`)
    member.roles.remove('814859487722078259');
  }, ms(süre));
}
})



//--------------------------------------------------JAİL------------------------------------------------------\\
client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.cache.get(data2)
if(!rol) return;
let kişi = member.guild.members.cache.get(member.id)
kişi.roles.add(rol.id);
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`)
  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`**Dostum Hadi Amaa..** \`Avenger Supervizor\` **Kaçamazsın Kandırmayalım Bir Birimizi !!**`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})



//--------------------------------------------------KÜFÜR------------------------------------------------------\\
client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu Sunucuda Küfür Filtre'si Aktif.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu Sunucuda Küfür Filtre'si Aktif.`).setColor('0x800d0d').setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});



//--------------------------------------------------REKLAM------------------------------------------------------\\
client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu Sunucuda Reklam Filtre'si Aktif.`).setColor('0x800d0d').setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });



///--------------------------------------------------SNİPE------------------------------------------------------\\
client.on('messageDelete', message => {
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)

})











////////////////////////////////////////////////////////////////////////////////
client.on("message", async message => {
  
  const lus = await db.fetch(`reklamkick_${message.guild.id}`)
    let sayı = await db.fetch(`sayı_${message.author.id}`);
let a = message.author
  if (lus) {
    const reklamengel = ["discord.app", "discord.gg", ".party", ".com", ".az", ".net", ".io", ".gg", ".me", "https", "http", ".com.tr", ".org", ".tr", ".gl", "glicht.me/", ".rf.gd", ".biz", "www.", "www"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          db.add(`sayı_${message.author.id}`, 1)
          if (sayı == null) {
            const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Bu I. Uyarın Lütfen Tekrarlama!`)
            message.channel.send(sa)
            message.delete()
            a.send(`Bu I. Uyarın Lütfen Tekrarlama`)
            return 
          }
         if (sayı === 1) {
               const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Bu II. Uyarın Lütfen Tekrarlama!`)
            message.channel.send(sa)
            message.delete()
            a.send(`Bu II. Uyarın Lütfen Tekrarlama`)
            return 
         }
            if (sayı > 2) {
               const sa = new Discord.MessageEmbed()
            .setDescription(`Hey! <@${message.author.id}> Reklamdan Dolayı Kickledim!`)
            message.channel.send(sa)
            message.delete()
            a.send(`${message.guild.name} Sunucusundan Reklam Yaptığın İçin Kicklendin!`)
                db.delete(`sayı_${message.author.id}`)
message.guild.member(a).kick();     
              return
            }
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});

//_____________________________


//////////////////////////////BotAtack/////////////////////////////////////////////////

client.on('guildMemberAdd', async (member) => {
  let a = await db.fetch(`r_${member.guild.id}`)
  if (a) {
    const guild = member.guild;


 let channels = member.guild.channels.cache.find(c => c.name === 'guard-²')

    if(member.user.bot !==true){

    } 
    else {

    channels.send(`**Sunucumza Bot Geldıgı Icın Banlandı !!**`)
    .then(() => console.log(`yasaklandı ${member.displayName}`))
    .catch(console.error);
       member.ban(member) 
    }
  }  
  });

//// KÜFÜR
client.on("message", async message => {
  
  const lus = await db.fetch(`küfür_${message.guild.id}`)
  if (lus) {
    const reklamengel = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Küfür Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});
client.on("messageUpdate", async message => {
  
  const lus = await db.fetch(`küfür_${message.guild.id}`)
  if (lus) {
    const reklamengel = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "youtube.com"];
    if (reklamengel.some(word => message.content.toLowerCase().includes(word))) {
      try {
        if (!message.member.permissions.has('KICK_MEMBERS')) {
          message.delete();
          
          return message.reply('Hey Dur! Bu Sunucuda Reklamı Engelliyorum').then(message => message.delete(3000));
          
        }
      } catch(err) {
        console.log(err);
    }
  }
}
if (!lus) return;
});


//modlog 
client.on("messageDelete", async message => {
  let a = await db.fetch(`modlog_${message.guild.id}`)
  if (a) {
    const sa = new Discord.MessageEmbed()
    .setTitle('Mesaj Silindi')
    .setDescription(`\`${message.author.tag}\`**'a Ait** \n\`${message.content}\` **Mesaj Silindi**`)
    .setTimestamp()
    client.channels.cache.get(a).send(sa)
  }
})



//EVERYONE ENGEL
client.on("message", async msg => {
  
let hereengelle = await db.fetch(`hereengel_${msg.guild.id}`)
 if (hereengelle == 'acik') {
   
      const here = ["@here", "@everyone"];
  if (here.some(word => msg.content.toLowerCase().includes(word)) ) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      msg.delete()
       return msg.reply('Yakaladım Seni! Everyone ve Here Etiketlemek Yasak.').then(nordx => nordx.delete({timeout: 5000}))
        }
    }
 } else if (hereengelle == 'kapali') {
 
}
});


//CAPS
 client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 1) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel.send(`${msg.member}, ***Capslock'u Kapat Lütfen!***`).then(nordx => nordx.delete({timeout: 5000}))
              
          }
        }
      }
    }
  }
});