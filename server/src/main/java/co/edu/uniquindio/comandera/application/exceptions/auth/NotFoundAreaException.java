package co.edu.uniquindio.comandera.application.exceptions.auth;

public class NotFoundAreaException extends Exception
{
    public NotFoundAreaException(String message)
    {
        super(message);
    }

    public NotFoundAreaException()
    {
        this("The area could not be found");
    }
}
