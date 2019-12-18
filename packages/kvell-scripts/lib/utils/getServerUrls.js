const ip = require("ip");

const getServerUrls = () => {
  return { localIp: ip.address() };
};

module.exports = getServerUrls;
