package org.hoffman.jobengine.model;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

// What gets persisted

@Entity
@Table(name = "job_offers")
@Data                 // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor     // generates no-arg constructor
@AllArgsConstructor    // generates all-arg constructor
public class JobOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private UUID clientId; // store the client identifier
    private String jobTitle;
    private String location;
    private double offerSalary;
    private double normalizedSalary; // calculated field
    private double score; // calculated field
}
