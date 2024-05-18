const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409,
};

const ReasonStatuscode = {
    FORBIDDEN: "Bad request error",
    CONFLICT: "Conflict error",
};

class ErrorRes extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConfigResquestError extends ErrorRes {
    constructor(
        message = ReasonStatuscode.CONFLICT,
        status = statusCode.FORBIDDEN
    ) {
        super(message, status);
    }
}

class BadRequestError extends ErrorRes {
    constructor(
        message = ReasonStatuscode.CONFLICT,
        status = statusCode.FORBIDDEN
    ) {
        super(message, status);
    }
}

module.exports = {
    ConfigResquestError,
    BadRequestError,
};
