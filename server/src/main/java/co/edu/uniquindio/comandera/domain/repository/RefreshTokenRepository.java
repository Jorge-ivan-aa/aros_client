package co.edu.uniquindio.comandera.domain.repository;

import java.util.Optional;

import co.edu.uniquindio.comandera.domain.util.RefreshToken;

public interface RefreshTokenRepository {
    /**
     * find a token using id
     *
     * @param id token's id
     *
     * @return the matched token
     */
    public Optional<RefreshToken> findById(String id);
    
    public Optional<RefreshToken> findByHash(String hash);
    
    /**
     * store a token on repository
     * 
     * @param token the token to store
     * 
     * @return stored token or {@code null} if not stored
     */
    public RefreshToken create(RefreshToken token);

    /**
     * expire a token
     *
     * @param id token's id
     */
    public void revokeToken(String id);
}
