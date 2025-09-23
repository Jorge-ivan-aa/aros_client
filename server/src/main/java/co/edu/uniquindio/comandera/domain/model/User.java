package co.edu.uniquindio.comandera.domain.model;

import co.edu.uniquindio.comandera.domain.model.services.PasswordHasher;

public abstract class User {
    private final String name;
    private final String email;
    private final String passwordHash;

    public User(String name, String email, String passwordHash) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public boolean passwordMatches(String rawPassword, PasswordHasher hasher) {
        return hasher.matches(rawPassword, this.passwordHash);
    }

}
