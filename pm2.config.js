module.exports = {
  apps: [
    {
      name: "Todo",
      script: "index.js",
      instances: 2,
      exec_mode: "cluster",
      watch: true,
      env: {
        NODE_ENV: "development",
        DATABASE_URL: process.env.DATABASE_URL,
      },
      node_args: "--optimize_for_size --max_old_space_size=920",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      out_file: "./logs/out.log",
      error_file: "/logs/error.log",
      merge_logs: true,
    },
  ],
};
