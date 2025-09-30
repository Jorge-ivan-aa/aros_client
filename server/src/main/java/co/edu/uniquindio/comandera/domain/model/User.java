package co.edu.uniquindio.comandera.domain.model;

import co.edu.uniquindio.comandera.domain.model.services.PasswordHasher;

public abstract class User {
    private final Long id;
    private final String name;
    private final String email;
    private final String passwordHash;

    public User(Long id, String name, String email, String passwordHash) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public boolean passwordMatches(String rawPassword, PasswordHasher hasher) {
        return hasher.matches(rawPassword, this.passwordHash);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }
}
