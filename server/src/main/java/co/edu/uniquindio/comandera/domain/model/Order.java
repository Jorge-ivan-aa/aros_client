package co.edu.uniquindio.comandera.domain.model;

import java.time.LocalDateTime;

public record Order(
    Long id,
    Worker responsable,
    Table table,
    LocalDateTime creation,
    Float total
) {
}
