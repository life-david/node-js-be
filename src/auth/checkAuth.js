const apiKeyService = require("../services/apiKey.service");

const HEADER = {
    API_KEY: "x-api-key",
    AUTHORIZATION: "athorization",
};

const apikey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        console.log(key);
        if (!key)
            return res.status(403).json({ message: "Api key is required" });

        // check api key
        const objKey = await apiKeyService.findById(key);

        if (!objKey)
            return res.status(403).json({ message: "Api key is invalid" });

        req.objKey = objKey;
        next();
    } catch (error) {}
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

const asyncHander = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
    apikey,
    permission,
    asyncHander,
};
