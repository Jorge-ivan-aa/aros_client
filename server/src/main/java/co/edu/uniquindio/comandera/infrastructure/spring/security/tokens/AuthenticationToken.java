package co.edu.uniquindio.comandera.infrastructure.spring.security.tokens;


import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticationToken extends AbstractAuthenticationToken
{
    private String token;
    private Object principal;

    public AuthenticationToken(
        String token
    ) {
        super(null);
        this.token = token;
        this.principal = null;
        setAuthenticated(false);
    }
    
    public AuthenticationToken(
        UserDetails principal,
        String token,
        Collection<? extends GrantedAuthority> authorities
    ) {
        super(authorities);
        this.token = token;
        this.principal = principal;
        setAuthenticated(true);
    }
    
    @Override
    public Object getCredentials()
    {
        return this.token;
    }
    
    @Override
    public Object getPrincipal()
    {
        return this.principal;
    }
}
