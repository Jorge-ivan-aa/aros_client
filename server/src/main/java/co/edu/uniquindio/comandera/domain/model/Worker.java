package co.edu.uniquindio.comandera.domain.model;

public class Worker extends User {
    String identification;
    String phone;
    String image;
    String address;
    String observations;
    Boolean enable;

    public Worker(String name, String email, String password) {
        super(name, email, password);
    }
}
