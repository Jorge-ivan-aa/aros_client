package co.edu.uniquindio.comandera.infrastructure.spring.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import co.edu.uniquindio.comandera.domain.model.User;

public class UserDetailsAdapter implements UserDetails
{
    private String name;
    
    private String email;
    
    private String password;

    private String type; // User|Admin|Worker

    public UserDetailsAdapter(User user)
    {
        this.name = user.getName();
        this.email = user.getEmail();
        this.password = user.getPasswordHash();
        this.type = user.getClass().getSimpleName();
    }
    
    @Override
    public String getUsername()
    {
        return this.email;
    }
    
    @Override
    public String getPassword()
    {
        return this.password;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return null;
    }
    
    public String getType()
    {
        return this.type;
    }
    
    public String getEmail()
    {
        return this.email;
    }
    
    public String getName()
    {
        return this.name;
    }
}
