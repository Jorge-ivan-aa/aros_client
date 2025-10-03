package co.edu.uniquindio.comandera.domain.model;

import java.util.HashSet;
import java.util.Set;

import co.edu.uniquindio.comandera.domain.model.enums.Area;

public class Worker extends User
{
    private String identification;

    private String phone;

    private String image;

    private String address;

    private String observations;

    private boolean enable;
    
    private Set<Area> areas;

    public Worker(Long id, String name, String email, String password)
    {
        super(id, name, email, password);
    }
    
    public Worker(
        Long id,
        String identification,
        String name,
        String email,
        String password,
        String phone,
        String image,
        String address,
        String observations,
        boolean enable
    ) {
        this(id, name, email, password);
        this.identification = identification;
        this.phone = phone;
        this.image = image;
        this.address = address;
        this.observations = observations;
        this.enable = enable;
        this.areas = new HashSet<>();
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public Set<Area> getAreas() {
        return areas;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
    }
}
