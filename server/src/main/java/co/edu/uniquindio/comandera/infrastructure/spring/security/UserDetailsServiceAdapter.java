package co.edu.uniquindio.comandera.infrastructure.spring.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;

public class UserDetailsServiceAdapter implements UserDetailsService
{
    private UserRepository userRepository;
    
    public UserDetailsServiceAdapter(UserRepository repository)
    {
        this.userRepository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = this.userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(username));

        return new UserDetailsAdapter(user);
    }
}
