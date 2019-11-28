const doesFileExistsInPath = filePath => {
  try {
    require.resolve(filePath);
    return true;
  } catch (exception) {
    return false;
  }
};

module.exports = doesFileExistsInPath;
