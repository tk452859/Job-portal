package org.example.job_app1.service;


import org.example.job_app1.model.jobPost;
import org.example.job_app1.repo.JobRespository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

//import java.util.ArrayList;
//import java.util.Arrays;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
//import java.util.Objects;

//import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
@Service
public class JobService {

    @Autowired
    private JobRespository jobRespository;

    // Add a new job
    public void addJob(jobPost jobPost) {
        jobRespository.save(jobPost);
    }

    // Get all jobs
    public List<jobPost> getJobs() {
        return jobRespository.findAll();
    }

    // Get single job by ID
    public jobPost getJob(Integer id) {
        return jobRespository.findById(id).orElse(null);
    }

    // Delete job by ID
    public void delete(Integer id) {
        jobRespository.deleteById(id); // ✅ simpler and correct
    }

    // Load dummy data
    public void load1() {
        List<jobPost> jobs = new ArrayList<>(Arrays.asList(
                new jobPost(1, "Backend Developer", "Develop REST APIs and microservices using Spring Boot", 2,
                        Arrays.asList("Java", "Spring Boot", "MySQL", "REST APIs")),

                new jobPost(2, "Frontend Engineer", "Build responsive user interfaces with modern frameworks", 1,
                        Arrays.asList("React", "JavaScript", "CSS", "HTML5")),

                new jobPost(3, "DevOps Specialist", "Manage cloud infrastructure and CI/CD pipelines", 3,
                        Arrays.asList("AWS", "Docker")),

                new jobPost(4, "Data Scientist", "Analyze data and build machine learning models", 2,
                        Arrays.asList("Python", "SQL")),

                new jobPost(5, "Mobile Developer", "Develop cross-platform mobile applications", 1,
                        Arrays.asList("Flutter", "Dart", "REST APIs"))
        ));
        jobRespository.saveAll(jobs);
    }

    // Search by profile/description
    public List<jobPost> search(String profileKeyword, String descKeyword) {
        return jobRespository.findByPostProfileContainingOrPostDescContaining(profileKeyword, descKeyword);
    }

    // Update job
    public jobPost update(jobPost updatedJob) {
        // ✅ Ensure ID exists before updating
        return jobRespository.findById(updatedJob.getPostid())
                .map(existingJob -> {
                    existingJob.setPostProfile(updatedJob.getPostProfile());
                    existingJob.setPostDesc(updatedJob.getPostDesc());
                    existingJob.setReqExperience(updatedJob.getReqExperience());
                    existingJob.setPostTechStack(updatedJob.getPostTechStack());
                    return jobRespository.save(existingJob);
                })
                .orElseThrow(() -> new RuntimeException("Job not found with id " + updatedJob.getPostid()));
    }
}






