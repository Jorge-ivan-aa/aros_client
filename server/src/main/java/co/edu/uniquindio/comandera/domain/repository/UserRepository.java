package co.edu.uniquindio.comandera.domain.repository;

import java.util.Optional;

import co.edu.uniquindio.comandera.domain.model.User;

public interface UserRepository {
    /**
     * find a user using his id
     *
     * @param id user's id
     *
     * @return the finded user
     */
    public Optional<User> findById(Long id);
    
    /**
     * find a user using his email
     *
     * @param email employee's email
     *
     * @return finded employee
     */
    public Optional<User> findByEmail(String email);

    /**
     * delete a user using his id
     *
     * @param id user's id
     */
    public void deleteById(Long id);
}
