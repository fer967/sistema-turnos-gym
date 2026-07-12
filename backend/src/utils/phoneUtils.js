export function normalizePhoneNumber(phone) {

    if (!phone) {
        return null;
    }

    // Elimina espacios, guiones, paréntesis y el +
    let normalized = phone.replace(/[^\d]/g, "");

    // Si empieza con 549 => 54
    if (normalized.startsWith("549")) {
        normalized =
            "54" + normalized.substring(3);
    }

    // Si empieza con 351 => agrega 54
    else if (normalized.startsWith("351")) {
        normalized = "54" + normalized;
    }

    // Si empieza con 0351 => elimina 0 y agrega 54
    else if (normalized.startsWith("0351")) {
        normalized = "54" + normalized.substring(1);
    }

    return normalized;
}