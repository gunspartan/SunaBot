exports.run = (client, message, args, func, msg, prefix) => {
  // Webhooks command
  // Delete the message that the user sends.
  message.delete();

  if (msg === prefix + "HOOK") {
    // Checks if the only thing the sent was 'HOOK'.
    return func.hook(
      message.channel,
      "Hook usage",
      `${prefix}hook <title>, <message>, [HEXcolor], [avatarURL]\n\n**<> is required\n[] is optional.**`,
      "FC8469",
      "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"
    );
  }

  let hookArgs = message.content.slice(prefix.length + 4).split(","); // Slices the first 6 letters (prefix & the word 'hook') then split them by 'commas'

  func.hook(
    message.channel,
    hookArgs[0],
    hookArgs[1],
    hookArgs[2],
    hookArgs[3]
  ); // This is where it actually calls the hook.
};
