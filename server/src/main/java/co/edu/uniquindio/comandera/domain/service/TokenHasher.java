package co.edu.uniquindio.comandera.domain.service;

public interface TokenHasher {
    /**
     * hash a token
     *
     * @param token token to hash
     *
     * @return hashed token
     */
    public String hash(String token);
    
    /**
     * 
     * @param token
     * @param hashed
     * @return
     */
    public boolean validate(String token, String hashed);
}
