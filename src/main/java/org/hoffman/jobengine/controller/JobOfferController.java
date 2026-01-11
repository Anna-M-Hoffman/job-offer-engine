package org.hoffman.jobengine.controller;
// Exposes REST API

import org.hoffman.jobengine.dto.JobOfferRequest;
import org.hoffman.jobengine.model.JobOffer;
import org.hoffman.jobengine.service.JobOfferService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/job-offers")
public class JobOfferController {

    private final JobOfferService service;

    public JobOfferController(JobOfferService service) {
        this.service = service;
    }

    @PostMapping
    public JobOffer createOffer(
            @RequestHeader("X-Client-Id") UUID clientId,
            @RequestBody JobOfferRequest request) {

        return service.createOffer(clientId, request);
    }

    @GetMapping
    public List<JobOffer> getOffers(
            @RequestHeader("X-Client-Id") UUID clientId) {

        return service.getOffers(clientId);
    }
}

