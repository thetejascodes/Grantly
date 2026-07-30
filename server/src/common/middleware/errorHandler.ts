import type { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/api-error.js';
import ApiResponses from '../utils/api-response.js';

export interface CustomError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = { ...err };
    error.message = err.message;

    // Log to console for dev
    console.error(err);

    // ApiError - Operational error
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: null
        });
    }

    // Wrong MongoDB ID error
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format',
            data: null
        });
    }

    // Duplicate field error
    if ((err as any).code === 11000) {
        const field = Object.keys((err as any).keyValue)[0];
        return res.status(409).json({
            status: 'error',
            message: `${field} already exists`,
            data: null
        });
    }

    // Validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message,
            data: null
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token',
            data: null
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            status: 'error',
            message: 'Token expired',
            data: null
        });
    }

    // Default error
    return res.status(err.statusCode || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        data: null
    });
};

export default errorHandler;
