package org.hoffman.jobengine.service;

import org.springframework.stereotype.Service;

// Isolates APIs and datasets
@Service
public class ExternalDataService {

    public double getCostOfLivingIndex(String location) {
        // TODO: replace with real dataset or API
        return 1.15; // example multiplier
    }

    public double getInflationMultiplier() {
        // TODO: call FRED API later
        return 1.03;
    }

    public double getCareerGrowthScore(String jobTitle) {
        // TODO: BLS API later
        return 0.75;
    }
}
