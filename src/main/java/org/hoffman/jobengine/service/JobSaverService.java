package org.hoffman.jobengine.service;
// Core business logic

import lombok.Data;
import org.hoffman.jobengine.dto.JobSaverRequest;
import org.hoffman.jobengine.model.JobSaver;
import org.hoffman.jobengine.model.JobStatus;
import org.hoffman.jobengine.repository.JobSaverRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Data
@Service
public class JobSaverService {

    private final JobSaverRepository repository;

    public JobSaver createJob(UUID clientId, JobSaverRequest request) {

        double salary = request.getSalary();
        double desiredSalary = request.getDesiredSalary();

        double score = salary / desiredSalary;

        JobSaver job = new JobSaver();
        job.setClientId(clientId);
        job.setJobTitle(request.getJobTitle());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());
        job.setDesiredSalary(request.getDesiredSalary());
        job.setScore(score);
        job.setCompany(request.getCompany());

        if (request.getStatus() == null) {
            job.setStatus(JobStatus.PENDING);
        } else {
            job.setStatus(request.getStatus());
        }

        return repository.save(job);
    }

    public List<JobSaver> getJob(UUID clientId) {
        return repository.findByClientId(clientId);
    }
}
