module.exports = {
  apps: [
    {
      name: "server",
      script: "server.js",
      env_dev: {
        "NODE_ENV": "dev",
        "PORT": 3000,
        "JWT_SECRET": "417530414128f74c0e3067622041f33a8b1c66fcf2dc8d45672ede3db949dfaa"
      }
    }
  ]
};
