module.exports = {
  apps: [
    {
      name: "server",
      script: "server.js",
      env_dev: {
        "NODE_ENV": "dev",
        "PORT": 3000
      }
    }
  ]
};
