package co.edu.uniquindio.comandera.application.dto.auth;

public class AuthTokenReponseDto
{
    /**
     * refresh token
     */
    private String refresh;

    /**
     * acess token
     */
    private String access;
    
    public AuthTokenReponseDto(String refresh, String access)
    {
        this.refresh = refresh;
        this.access = access;
    }

    public String getRefresh() {
        return refresh;
    }

    public void setRefresh(String refresh) {
        this.refresh = refresh;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }
}