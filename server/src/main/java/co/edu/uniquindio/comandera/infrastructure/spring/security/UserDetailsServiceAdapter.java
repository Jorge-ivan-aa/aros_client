package co.edu.uniquindio.comandera.infrastructure.spring.security;

import java.util.HashSet;
import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import co.edu.uniquindio.comandera.domain.model.Area;
import co.edu.uniquindio.comandera.domain.model.User;
import co.edu.uniquindio.comandera.domain.model.Worker;
import co.edu.uniquindio.comandera.domain.repository.UserRepository;

@Service
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
