package com.procore.task.demo.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeParseException;

/**
 * A custom deserializer for OffsetDateTime that can handle both full timestamps
 * and simple date strings like "YYYY-MM-DD".
 */
public class LenientOffsetDateTimeDeserializer extends JsonDeserializer<OffsetDateTime> {

    @Override
    public OffsetDateTime deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String str = p.getText().trim();
        if (str.isEmpty()) {
            return null;
        }

        try {
            // First, try to parse it as a full OffsetDateTime
            return OffsetDateTime.parse(str);
        } catch (DateTimeParseException e) {
            // If that fails, try to parse it as a simple LocalDate
            try {
                LocalDate localDate = LocalDate.parse(str);
                // Convert to LocalDateTime at the start of the day
                LocalDateTime ldt = localDate.atStartOfDay();
                // Apply the server's default timezone offset
                return ldt.atOffset(ZoneOffset.systemDefault().getRules().getOffset(ldt));
            } catch (DateTimeParseException e2) {
                // If both fail, re-throw the original exception
                throw e;
            }
        }
    }
}