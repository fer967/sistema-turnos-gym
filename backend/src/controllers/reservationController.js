export const getAvailableReservations = (req, res) => {
    res.json({
        success: true,
        message: "Reservas disponibles"
    });
}

export const createReservation = (req, res) => {
    res.json({
        success: true,
        message: "Reserva creada"
    });
}

export const cancelReservation = (req, res) => {
    res.json({
        success: true,
        message: "Reserva cancelada"
    });
}


