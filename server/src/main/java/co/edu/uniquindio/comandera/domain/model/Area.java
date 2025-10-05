package co.edu.uniquindio.comandera.domain.model;

import co.edu.uniquindio.comandera.domain.model.enums.AreaType;

public class Area
{
    private Long id;

    private String name;

    private AreaType type;

    public Area() {
    }

    public Area(
        Long id,
        String name,
        AreaType type
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public AreaType getType()
    {
        return type;
    }

    public void setType(AreaType type)
    {
        this.type = type;
    }
}
