class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(statusCode: number, message: string,) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string) {
        return new ApiError(400, message);
    }
    static unauthorized(message: string) {
        return new ApiError(401, message);
    }
    static forbidden(message: string) {
        return new ApiError(403, message);
    }
    static notFound(message: string) {
        return new ApiError(404, message);
    }
    static conflict(message: string = "Conflict") {
        return new ApiError(409, message);
    }
    static internal(message: string = "Internal Server Error") {
        return new ApiError(500, message);
    }
    static tooManyRequests(message: string) {
        return new ApiError(429, message);
    }
}
export default ApiError