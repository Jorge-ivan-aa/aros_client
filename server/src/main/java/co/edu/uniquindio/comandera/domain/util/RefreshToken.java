package co.edu.uniquindio.comandera.domain.util;

import co.edu.uniquindio.comandera.domain.model.User;

public record RefreshToken(
    Integer id,
    User user,
    String token
) {
    
}
