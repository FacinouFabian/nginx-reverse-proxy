"use strict";

const lazyRateLimit = {
  get RateLimit() {
    return require("koa2-ratelimit").RateLimit;
  },
};

module.exports = async (ctx, next) => {
  const message = [
    {
      messages: [
        {
          id: "Auth.form.error.ratelimit",
          message: "Too many attempts, please try again in a minute.",
        },
      ],
    },
  ];

  const token = ctx.request.header.authorization.split(" ");

  return lazyRateLimit.RateLimit.middleware(
    Object.assign({}, strapi.plugins["users-permissions"].config.ratelimit, {
      interval: 1 * 60 * 1000,
      max: 10,
      prefixKey: `${ctx.request.path}:${token}`,
      /* keyGenerator: async () => {
        if (token) {
          return `${this.options.prefixKey}|${token}`;
        }
        return `${this.options.prefixKey}|${ctx.request.ip}`;
      }, */
      message,
    })
  )(ctx, next);
};
