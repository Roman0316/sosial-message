const fileRegexp = /(.+)\.(\w+)$/;

module.exports = function parseFilename(filename) {
  const match = filename.match(fileRegexp);
  return {
    name: match ? match[1] : '',
    ext: match ? match[2] : '',
  };
};
