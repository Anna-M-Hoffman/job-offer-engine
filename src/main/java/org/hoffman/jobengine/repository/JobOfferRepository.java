package org.hoffman.jobengine.repository;

import org.hoffman.jobengine.model.JobOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

// Standard Spring Data JPA (Java persistence connects to databases)
public interface JobOfferRepository extends JpaRepository<JobOffer, Long> {

    List<JobOffer> findByClientId(UUID clientId);
}

