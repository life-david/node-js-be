const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode");

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class ConflicResquestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statuscode = StatusCodes.FORBIDDEN
    ) {
        super(message, statuscode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.CONFLICT,
        statuscode = StatusCodes.FORBIDDEN
    ) {
        super(message, statuscode);
    }
}

class AuthFailureError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.UNAUTHORIZED,
        statuscode = StatusCodes.UNAUTHORIZED
    ) {
        super(message, statuscode);
    }
}

class NotFoundError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.NOT_FOUND,
        statuscode = StatusCodes.NOT_FOUND
    ) {
        super(message, statuscode);
    }
}

class ForbiddenError extends ErrorResponse {
    constructor(
        message = ReasonPhrases.FORBIDDEN,
        statuscode = StatusCodes.FORBIDDEN
    ) {
        super(message, statuscode);
    }
}

module.exports = {
    ConflicResquestError,
    BadRequestError,
    AuthFailureError,
    NotFoundError,
    ForbiddenError,
};
