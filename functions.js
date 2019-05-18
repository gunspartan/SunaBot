module.exports = {
  ping: function(channel) {
    channel.send("Pong!");
  },
  hook: function(channel, title, message, color, avatar) {
    // This function uses quite a few options. The last 2 are optional

    // Reassing default parameters - If any are blank.
    if (!channel) return console.log("Channel not specified.");
    if (!title) return console.log("Title not spcified.");
    if (!message) return console.log("Message not specified.");
    if (!color) color = "d9a744"; // This is an optional variable. Therefore the default HEX color will be whatever you post here.
    if (!avatar)
      avatar =
        "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"; // Also optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, "");
    avatar = avatar.replace(/\s/g, "");

    // This is the start of creating the webhook
    channel
      .fetchWebhooks() // This gets the webhooks in the channel.
      .then(webhook => {
        // Fetches the webhooks we will use for each hook.
        let foundHook = webhook.find(webhook => webhook.name === "Webhook"); // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of hte channel.

        // This runs if webhook is not found.
        if (!foundHook) {
          channel
            .createWebhook(
              "Webhook",
              "https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png"
            ) // Make sure this is the same thing when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
            .then(webhook => {
              // Finally send the webhook
              webhook
                .send("", {
                  username: title,
                  avatarURL: avatar,
                  embeds: [
                    {
                      color: parseInt(`0x${color}`),
                      description: message
                    }
                  ]
                })
                .catch(err => {
                  // We also want to make sure if an error is found, to report it in chat.
                  console.log(err);
                  return channel.send(
                    "**Something went wrong when sending the webhook. Please check the console**"
                  );
                });
            });
        } else {
          // That webhook was only for if it couldn't find the original webhook.
          foundHook
            .send("", {
              // This means you can just copy and paste the webhook & catch part.
              username: title,
              avatarURL: avatar,
              embeds: [
                {
                  color: parseInt(`0x${color}`),
                  description: message
                }
              ]
            })
            .catch(err => {
              // We also want to make sure if an error is found, to report it in chat.
              console.log(err);
              return channel.send(
                "**Something went wrong when sending the webhook. Please check the console**"
              );
            });
        }
      });
  },
  timeout: function(mutedMember, timeoutLength) {
    // Mute member
    mutedMember.setMute(true);
    // Set time to unmute
    setTimeout(() => {
      mutedMember.setMute(false);
    }, timeoutLength * 1000);
  }
};
