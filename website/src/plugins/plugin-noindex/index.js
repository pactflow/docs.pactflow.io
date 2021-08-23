module.exports = function (context, options) {
  return {
    name: "noindex-plugin",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "meta",
            attributes: {
              name: "robots",
              content: "noindex",
            },
          },
        ],
      };
    },
  };
};
