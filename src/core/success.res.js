const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatus = {
    CREATED: "Created",
    OK: "Success",
};

class SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.OK,
        reasonStatus = ReasonStatus.OK,
        data = {},
    }) {
        this.message = !message ? reasonStatus : message;
        this.statusCode = statusCode;
        this.data = data;
    }

    send(res, headers = {}) {
        return res.status(this.statusCode).json(this);
    }
}

class OK extends SuccessResponse {
    constructor({ message, data }) {
        super({ message, data });
    }
}

class CREATED extends SuccessResponse {
    constructor({
        message,
        statusCode = StatusCode.CREATED,
        reasonStatus = ReasonStatus.CREATED,
        data,
    }) {
        super({ message, statusCode, reasonStatus, data });
    }
}

module.exports = {
    OK,
    CREATED,
};
