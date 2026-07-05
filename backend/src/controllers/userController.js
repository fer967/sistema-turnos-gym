export const getProfile = (req, res) => {
    res.json({
        success: true,
        data: req.user,
        message: "Perfil del usuario"
    });
};