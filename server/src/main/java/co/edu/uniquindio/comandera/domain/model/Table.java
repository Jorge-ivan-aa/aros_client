package co.edu.uniquindio.comandera.domain.model;

public class Table {
    private Long id;
    private String numTable;
    private boolean available;

    public Table(Long id, String numTable, boolean available) {
        this.id = id;
        this.numTable = numTable;
        this.available = available;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumTable() {
        return numTable;
    }

    public void setNumTable(String numTable) {
        this.numTable = numTable;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    
}
