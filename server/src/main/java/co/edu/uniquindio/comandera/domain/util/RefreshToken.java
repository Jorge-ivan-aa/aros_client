package co.edu.uniquindio.comandera.domain.util;

import java.time.LocalDateTime;

public record RefreshToken(
    String id,
    String hash,
    LocalDateTime createdAt,
    LocalDateTime expiredAt,
    Long userId
) {
}
