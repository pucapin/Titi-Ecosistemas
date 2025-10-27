const supabase = require("./supabase.service");

let channel;

const initSocketInstance = () => {
  channel = supabase.channel("realtime-events");
};

const emitEvent = async (eventName, data = {}) => {
  if (!channel) {
    throw new Error("Supabase channel is not initialized");
  }

  const resp = await channel.send({
    type: "broadcast",
    event: eventName,
    payload: data,
  });

  return resp;
};

module.exports = {
  emitEvent,
  initSocketInstance,
};