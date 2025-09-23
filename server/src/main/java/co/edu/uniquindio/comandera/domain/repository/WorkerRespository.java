package co.edu.uniquindio.comandera.domain.repository;

import java.util.List;
import java.util.Optional;

import co.edu.uniquindio.comandera.domain.model.Worker;

public interface WorkerRespository {
    /**
     * find a employee/worker using user's id
     * 
     * @param id user's id
     * 
     * @return the finded worker
     */
    public Optional<Worker> findById(Integer id);
    
    /**
     * find a employee using his identification
     *
     * @param identification user's identification
     *
     * @return finded worker
     */
    public Optional<Worker> findByIdentification(String identification);
    
    /**
     * get all the employees/workers
     * 
     * @return workers
     */
    public List<Worker> findAll();
    
    /**
     * save a new worker
     * 
     * @return info of worker created
     */
    public Worker create(Worker user);
    
    /**
     * update the info of a worker
     *
     * @param worker worker's new info (must have a id)
     *
     * @return updated worker's info
     */
    public Worker update(Worker worker);
    
    /**
     * delete a worker using his id
     *
     * @param id worker's id
     */
    public void deleteById(Integer id);
}
