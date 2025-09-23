package co.edu.uniquindio.comandera.domain.model.services;

public interface PasswordHasher {
    String hash(String password);
    boolean matches(String rawPassword, String hashedPassword);
}
