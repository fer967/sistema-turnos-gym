export const successResponse = (
    res,
    statusCode = 200,
    message = "Operación realizada correctamente",
    data = null
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (
    res,
    statusCode = 500,
    message = "Error interno del servidor",
    errors = []
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors
    });
};