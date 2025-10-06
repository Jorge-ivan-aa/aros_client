package co.edu.uniquindio.comandera.infrastructure.spring.security;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.model.Worker;

public class UserDetailsAdapter implements UserDetails
{
    private User data;

    private String type;

    public UserDetailsAdapter(User user)
    {
        this.data = user;
        this.type = user.getClass().getSimpleName();
    }
    
    @Override
    public String getUsername()
    {
        return this.data.getEmail();
    }
    
    @Override
    public String getPassword()
    {
        return this.data.getPasswordHash();
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities()
    {
        return null;
    }
    
    public User getData()
    {
        return data;
    }

    public String getType()
    {
        return this.type;
    }
    
    public String getEmail()
    {
        return this.data.getEmail();
    }
    
    public String getName()
    {
        return this.data.getName();
    }

    public Set<Area> getAreas()
    {
        if (this.data instanceof Worker wo) {
            return wo.getAreas();
        } else {
            return Collections.emptySet();
        }
    }
}
