exports.run = (client, message, args, func, msg, prefix) => {
  // Purge Command
  async function purge() {
    message.delete(); // Deletes the command message so it does not interfere with the messages that are being deleted.

    // Make sure user has permission to use this command.
    if (!message.member.roles.find(role => role.name === "Discount U of T")) {
      // Checks to see if they do not have the role
      message.channel.send(
        "You need the 'bot-commander' role to use this command."
      );
      return; // returns the code so the rest does not run
    }

    // Make sure argument is a number
    if (isNaN(args[0])) {
      message.channel.send(
        "Please use a number as your aruments. \n Usage: " +
          prefix +
          "purge <amount>"
      );
      // Cancels out of the script so the rest does not run.
      return;
    }

    const fetched = await message.channel.fetchMessages({ limit: args[0] }); // Grabs the last number(args) of messages in the channel.
    console.log(fetched.size + " messages found, deleting..."); // Logs to the console how many messages are being deleted.

    // Deleteing the messages
    message.channel
      .bulkDelete(fetched)
      .catch(err => message.channel.send(`Error: ${err}`)); // If there is an error, post to the channel
  }
  // Run the purge function
  purge();
};
