package co.edu.uniquindio.comandera.infrastructure.spring.jpa.entity.entity.converters;

import co.edu.uniquindio.comandera.domain.model.enums.AreaType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AreaTypeConverter implements AttributeConverter<AreaType, String> {
    @Override
    public String convertToDatabaseColumn(AreaType attribute) {
        return attribute.name();
    }

    @Override
    public AreaType convertToEntityAttribute(String dbData) {
        return AreaType.valueOf(dbData);
    }
}
