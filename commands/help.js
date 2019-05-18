const Discord = require("discord.js");
// Call the file with all the functions.
const func = require("./functions.js");

// Call JSON Files
const commands = JSON.parse(fs.readFileSync("Storage/commands.json", "utf8"));

exports.run = (client, message, args, func, msg, prefix) => {
  // Help command with catergorys = eg: ~help mod (shows moderator commands), ~help admin (shows admin commands), as well as ~help <command> to show more info
  if (msg.startsWith(prefix + "HELP")) {
    // Call the JSON file of commands.

    // Let's see if the only thing they typed in chat was ~help
    if (msg === `${prefix}HELP`) {
      // If they only typed this, lets ONLY show the commands for regular users.

      // Start of the embed
      const embed = new Discord.RichEmbed().setColor(0x1d82b6); // Set color to whatever you want.

      // Variables
      let commandsFound = 0; // We want to tell them how many commands there are for that specific group.

      // Lets create the for loop that loops through the commands
      for (var cmd in commands) {
        // Checks if the group is "users".
        if (commands[cmd].group.toUpperCase() === "USER") {
          // Lets also count commands found + 1 every time it finds a command in the group
          commandsFound++;
          // Lets add the command field to the embed.
          embed.addField(
            `${commands[cmd].name}`,
            `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix +
              commands[cmd].usage}`
          ); // This will output something like <commandname>[title] [newline] desc: <description> [newline] usage: <usage>
        }
      }

      // Add some more to the embed.
      embed.setFooter(
        `Currently showing user commands. To view another group do ${prefix}help [group / command]`
      );
      embed.setDescription(
        `**${commandsFound} commands found** - <> means required, [] means optional.`
      );

      // We can output in 2 ways. 1 = Send to DMs, and tell them that tehy sent to DMs in chat. 2 - Post commands in chat. [since commands take up a lot let's send to DMs.]
      message.author.send({ embed });
      // Post in chat they sent to DMs
      message.channel.send({
        embed: {
          color: 0x1d82b6,
          description: `**Check your DMs ${message.author}!**`
        }
      });
    } else if (args.join(" ").toUpperCase() === "GROUPS") {
      // Variables
      let groups = "";

      for (var cmd in commands) {
        if (!groups.includes(commands[cmd].group)) {
          groups += `${commands[cmd].group}\n`;
        }
      }

      message.channel.send({
        embed: {
          description: `**${groups}**`,
          title: "Groups",
          color: 0x1d82b6
        }
      });

      return;
    } else {
      // Do something when they do ~help [group / command]

      // Variables
      let groupFound = "";

      for (var cmd in commands) {
        // This will see if there is a group named after what the user entered.

        if (
          args
            .join(" ")
            .trim()
            .toUpperCase() === commands[cmd].group.toUpperCase()
        ) {
          groupFound = commands[cmd].group.toUpperCase(); // Lets set the group found, then break out of the Loop.
          break;
        }
      }

      if (groupFound != "") {
        // If a group is found, run this statement.

        // Start of the embed
        const embed = new Discord.RichEmbed().setColor(0x1d82b6); // Set color to whatever you want.

        // Variables
        let commandsFound = 0; // We want to tell them how many commands there are for that specific group.

        for (var cmd in commands) {
          // Checks if the group is "users".
          if (commands[cmd].group.toUpperCase() === groupFound) {
            // Lets also count commands found + 1 every time it finds a command in the group
            commandsFound++;
            // Lets add the command field to the embed.
            embed.addField(
              `${commands[cmd].name}`,
              `**Description:** ${commands[cmd].desc}\n**Usage:** ${prefix +
                commands[cmd].usage}`
            ); // This will output something like <commandname>[title] [newline] desc: <description> [newline] usage: <usage>
          }
        }
        // Add some more to the embed.
        embed.setFooter(
          `Currently showing ${groupFound} commands. To view another group do ${prefix}help [group / command]`
        );
        embed.setDescription(
          `**${commandsFound} commands found** - <> means required, [] means optional.`
        );

        // We can output in 2 ways. 1 = Send to DMs, and tell them that tehy sent to DMs in chat. 2 - Post commands in chat. [since commands take up a lot let's send to DMs.]
        message.author.send({ embed });
        // Post in chat they sent to DMs
        message.channel.send({
          embed: {
            color: 0x1d82b6,
            description: `**Check your DMs ${message.author}!**`
          }
        });
        return;
      }

      // If a group is not found, lets see if it is a command.

      //Variables
      let commandFound = "";
      let commandDesc = "";
      let commandUsage = "";
      let commandGroup = "";

      for (var cmd in commands) {
        if (
          args
            .join(" ")
            .trim()
            .toUpperCase() === commands[cmd].name.toUpperCase()
        ) {
          commandFound = commands[cmd].name;
          commandDesc = commands[cmd].desc;
          commandUsage = commands[cmd].usage;
          commandGroup = commands[cmd].group;
          break;
        }
      }

      // Lets post in chat if noting is found.
      if (commandFound === "") {
        message.channel.send({
          embed: {
            description: `**No group or command found titled \`${args.join(
              " "
            )}\`**`,
            color: 0x1d82b6
          }
        });
      }
      // Since this once is smaller, let's send the embed differently.
      message.channel.send({
        embed: {
          title: "<> means required, [] means optional.",
          color: 0x1d82b6,
          fields: [
            {
              name: commandFound,
              value: `**Description: ** ${commandDesc}\n**Usage: **${commandUsage}\n**Group: **${commandGroup}`
            }
          ]
        }
      });
    }
  }
};
