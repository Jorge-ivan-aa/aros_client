package co.edu.uniquindio.comandera.domain.repository;

import java.util.List;
import java.util.Optional;

import co.edu.uniquindio.comandera.domain.model.Admin;

public interface AdminRepository {
    /**
     * find a administrator using user's id
     * 
     * @param id user's id
     * 
     * @return the finded admin
     */
    public Optional<Admin> findByUserId(Integer id);
    
    /**
     * get all the adminitrators
     * 
     * @return administrator
     */
    public List<Admin> findAll();
}
