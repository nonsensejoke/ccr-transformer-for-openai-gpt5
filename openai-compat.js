module.exports = function (options) {
  return {
    name: "openai-compat",

    transformRequestIn(request) {
      delete request.reasoning;
      delete request.thinking;
      return request;
    },

    transformRequestOut(request) {
      // 删除 reasoning 相关字段
      delete request.reasoning;
      delete request.thinking;

      // max_tokens → max_completion_tokens（GPT-5 系列要求）
      if (request.max_tokens !== undefined) {
        request.max_completion_tokens = request.max_tokens;
        delete request.max_tokens;
      }

      return request;
    },
  };
};
