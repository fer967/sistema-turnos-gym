import styles from "./ScheduleFields.module.css";

export default function ScheduleFields({
    form,
    disciplines,
    handleChange
}) {

    return (
        <>

            <label>Disciplina</label>

            <select
                name="discipline_id"
                value={form.discipline_id}
                onChange={handleChange}
            >
                {
                    disciplines.map((discipline) => (
                        <option
                            key={discipline.id}
                            value={discipline.id}
                        >
                            {discipline.name}
                        </option>
                    ))
                }
            </select>

            <label>Día</label>

            <select
                name="day_of_week"
                value={form.day_of_week}
                onChange={handleChange}
            >
                <option value="0">Domingo</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>
            </select>

            <label>Hora inicio</label>

            <input
                type="time"
                name="start_time"
                value={form.start_time}
                onChange={handleChange}
            />

            <label>Hora fin</label>

            <input
                type="time"
                name="end_time"
                value={form.end_time}
                onChange={handleChange}
            />

            <label>Capacidad</label>

            <input
                type="number"
                min="1"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
            />

        </>
    );

}