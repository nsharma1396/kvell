const doesFileExistsInPath = filePath => {
  try {
    require.resolve(filePath);
    return true;
  } catch {
    return false;
  }
};

module.exports = doesFileExistsInPath;
