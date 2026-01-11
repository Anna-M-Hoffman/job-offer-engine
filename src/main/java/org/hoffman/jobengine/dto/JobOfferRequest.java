package org.hoffman.jobengine.dto;
// What the frontend sends

import lombok.Data;

@Data
public class JobOfferRequest {

    private String jobTitle;
    private String location;
    private double offerSalary;

    private double salaryWeight;
    private double locationWeight;
    private double growthWeight;

    // getters & setters
}
