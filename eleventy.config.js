module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets/**/*.*");
  eleventyConfig.addPassthroughCopy("./src/css/*.*");
  eleventyConfig.addPassthroughCopy("./src/js/*.js");
  eleventyConfig.addWatchTarget("./src/**/*.njk");
  eleventyConfig.addWatchTarget("./src/**/js/*.js");
  eleventyConfig.addWatchTarget("./src/css/*.css");

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
