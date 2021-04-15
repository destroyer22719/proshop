export const error404 = (req, res, next) => {
    const error = new Error(`Cannot find route ${req.originalUrl}`);
    res.status(404);
    next(error);
};

export const error500 = (err, req, res, next) => {
    const error = res.statusCode === 200 ? 500: res.statusCode;
    res.status(error);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null: err.stack,
    });
};
