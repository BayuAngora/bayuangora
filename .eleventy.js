const siteData = require("./site.json");
const markdownIt = require("markdown-it");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addGlobalData("site", siteData);
  let markdownOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  eleventyConfig.setLibrary("md", markdownIt(markdownOptions));
  return {
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
    dir: {
      input: "content",
      layouts: "../layouts",
      includes: "../layouts/_partials",
      output: "public"
    }
  };
};
