package co.edu.uniquindio.comandera.domain.model;

import java.time.LocalDateTime;

public record Order(
    Integer id,
    Worker responsable,
    Table table,
    boolean isCompleted,
    LocalDateTime creation,
    Float total
) {
}// obtengo todas las orders completadas,
