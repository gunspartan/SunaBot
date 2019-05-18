exports.run = (client, message, args, func, msg, prefix) => {
  // Only let Gun or people with the "ONE" role run the command.
  // Check if they have the "ONE" role.
  let oneRole = message.member.roles.find(role => role.name === "ONE");
  if (message.author.id == "132418402408071168" || oneRole) {
    // Find guild member ID.
    let mutedMember = message.mentions.members.first();
    // set empty variable for timeout length.
    let timeoutLength;
    if (args.length == 1) {
      timeoutLength = 10;
    } else {
      let timeoutArgs = message.content.slice(prefix.length + 8).split(" ");
      timeoutLength = timeoutArgs[1];
    }
    message.channel.send(`${mutedMember} muted for ${timeoutLength} seconds.`);
    func.timeout(mutedMember, timeoutLength);
  } else {
    message.channel.send("You cannot use this command.");
    return;
  }
};
