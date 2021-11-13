const {MONGODB_URI, TOKEN_SECRET, GITHUB_CALLBACK_URL, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID} = process.env;

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = (file) => {};
}

module.exports = {
    env: {
      "MONGODB_URI": MONGODB_URI,
      "TOKEN_SECRET": TOKEN_SECRET,
      "GITHUB_CALLBACK_URL": GITHUB_CALLBACK_URL,
      "GITHUB_CLIENT_SECRET": GITHUB_CLIENT_SECRET,
      "GITHUB_CLIENT_ID": GITHUB_CLIENT_ID
    }
  }
