package co.edu.uniquindio.comandera.domain.service;

import co.edu.uniquindio.comandera.domain.model.User;

public interface TokenService {
    /**
     * generate a new (opaque) refresh token
     *
     * @param user owner of the token
     *
     * @return generated token
     */
    public String generateRefreshToken(User user);

    /**
     * generate a new accesss token
     *
     * @param user owner of the token
     *
     * @return generated token
     */
    public String generateAccessToken(User user);

    /**
     * check for a valid access token
     * 
     * @param token token to check
     *
     * @return token is valid
     */
    public boolean validateAccessToken(String token);

    /**
     * check for a valid refresh token
     * 
     * @param token token to check
     *
     * @return token is valid
     */
    // public boolean validateRefreshToken(String token);

    /**
     * extract the username from a access token
     * 
     * @param token token with the info
     *
     * @return extracted username
     */
    public String extractUsername(String token);
}
