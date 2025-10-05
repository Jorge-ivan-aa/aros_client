package co.edu.uniquindio.comandera.domain.model;


public class Admin extends User
{
    public Admin() {
    }

    public Admin(Long id, String name, String email, String password)
    {
        super(id, name, email, password);
    }
}
