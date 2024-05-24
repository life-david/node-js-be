const apiKeyService = require("../services/apiKey.service");
const path = require("path");
const path404 = path.join(__dirname, "src/html/404.html");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "athorization",
};

const apikey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log(key);
    if (!key) {
      // console.log(path404.replace("\\src\\auth", ""));
      // return res
      //     .status(403)
      //     .sendFile(path404.replace("\\src\\auth", ""));
      return res.status(403).json({ message: "Api key is required" });
    }
    // check api key
    const objKey = await apiKeyService.findById(key);

    if (!objKey) return res.status(403).json({ message: "Api key is invalid" });

    req.objKey = objKey;
    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const permission = (permission) => {
  return (req, res, next) => {
    if (req.objKey.permissions.includes(permission)) {
      next();
    } else {
      return res.status(403).json({ message: "Permission denied" });
    }
  };
};

module.exports = {
  apikey,
  permission,
};
