package co.edu.uniquindio.comandera.api.dto;

import java.util.Set;

public class WorkerRequestDTO {
    private String identification;
    private String name;
    private String password;
    private String phone;
    private String image;
    private String address;
    private String observations;
    private Boolean enable;
    private Set<Long> areaIds;

    public String getIdentification() { return identification; }
    public void setIdentification(String identification) { this.identification = identification; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getObservations() { return observations; }
    public void setObservations(String observations) { this.observations = observations; }

    public Boolean getEnable() { return enable; }
    public void setEnable(Boolean enable) { this.enable = enable; }

    public Set<Long> getAreaIds() { return areaIds; }
    public void setAreaIds(Set<Long> areaIds) { this.areaIds = areaIds; }


}