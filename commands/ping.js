exports.run = (client, message, args, func, msg, prefix) => {
  func.ping(message.channel);
};
