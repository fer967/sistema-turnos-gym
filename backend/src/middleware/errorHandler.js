export const errorHandler = (err, req, res, next) => {

    console.error("========== ERROR ==========");
    console.error(err);
    console.error("===========================");

    return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        errors: [
            process.env.NODE_ENV === "development"
                ? err.message
                : "Internal Server Error"
        ]
    });

};