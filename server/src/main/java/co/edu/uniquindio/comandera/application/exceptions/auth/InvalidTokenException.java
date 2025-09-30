package co.edu.uniquindio.comandera.application.exceptions.auth;

public class InvalidTokenException extends Exception
{
    public InvalidTokenException(String message)
    {
        super(message);
    }
    
    public InvalidTokenException()
    {
        this("Invalid or expired token");
    }
}
