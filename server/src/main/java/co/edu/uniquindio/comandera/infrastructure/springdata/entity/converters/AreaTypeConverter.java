package co.edu.uniquindio.comandera.infrastructure.springdata.entity.converters;

import co.edu.uniquindio.comandera.domain.model.enums.Area;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AreaTypeConverter implements AttributeConverter<Area, String> {
    @Override
    public String convertToDatabaseColumn(Area attribute) {
        return attribute.name();
    }

    @Override
    public Area convertToEntityAttribute(String dbData) {
        return Area.valueOf(dbData);
    }
}
