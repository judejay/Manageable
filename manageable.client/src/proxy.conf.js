const PROXY_CONFIG = [
  {
    context: ["/person"],
    target: "https://localhost:7051",
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
