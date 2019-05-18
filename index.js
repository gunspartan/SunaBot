// Install Discord.js
const Discord = require("discord.js");
const client = new Discord.Client();
const auth = require("./auth.json"); // Import Token
const fs = require("fs"); // Require the fs package for the Help command.

// Call the file with all the functions.
const func = require("./functions.js");

// Call JSON Files
const commands = JSON.parse(fs.readFileSync("Storage/commands.json", "utf8"));

// Global Settings.
const prefix = "~"; // Prefix

// Listener Event: Runs whenever a message is recieved.
client.on("message", message => {
  let msg = message.content.toUpperCase(); // Takes the message and converts it all to uppercase.
  let sender = message.author; // Find author of the message.
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(" "); // Slices off the command in cont, only leaving the arguments.
  let cmd = args.shift().toLowerCase(); // Takes away the first object in args array.

  // Make sure bot does not respond to itself.
  if (sender.bot) return; //
  if (!message.content.startsWith(prefix)) return; // If message does not start with the prefix, return

  // Command Handler - .trim() removes blank spaces on both sides of the string.
  try {
    let commandFile = require(`./commands/${cmd}.js`); // This will assign that filename to commandFile.
    commandFile.run(client, message, args, func, msg, prefix); // This will add the functions, from the functions.js file into each commandFile.
  } catch (err) {
    // Runs if an error occurs.

    console.log(err.message); // Logs the error message.
  } finally {
    // This will run after the first two clears up.

    console.log(`${message.author.username} ran the command: ${cmd}`);
  }
});

// Aaron auto-mute
client.on("voiceStateUpdate", (oldMember, newMember) => {
  // Assign the voice channel variables.
  let newUserChannel = newMember.voiceChannel;
  let oldUserChannel = oldMember.voiceChannel;

  // Check if someone new joined
  if (oldUserChannel === undefined && newUserChannel !== undefined) {
    // Check if Aaron join the channel.
    if (newMember.id === "135965518438989833") {
      // Mute if newMember is Aaron.
      newMember.setMute(true);
      setTimeout(() => {
        newMember.setMute(false);
      }, 10 * 1000);
    }
  }
});

// Listener Event: Runs whevener the bot sends a ready event (when it first starts for example).
client.on("ready", () => {
  console.log("Bot initiated...");
});

client.login(auth.token);
