package org.example.job_app1;

import org.example.job_app1.model.jobPost;
import org.example.job_app1.repo.JobRespository;
import org.example.job_app1.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class JOBRestController {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRespository jobRespository;

    @GetMapping("/")
    public String home() {
        return "Hello from Spring Boot! The server is running!";
    }

    // Get all jobs
    @GetMapping("/Jobposts")
    public List<jobPost> getJobs() {
        return jobService.getJobs();
    }

    // Get single job by ID
    @GetMapping("/Jobposts/{postid}")
    public jobPost getJob(@PathVariable Integer postid) {
        return jobService.getJob(postid);
    }

    // Search jobs
    @GetMapping("/Jobposts/keyword/{keyword}")
    public List<jobPost> searchJob(@PathVariable String keyword) {
        return jobService.search(keyword, keyword);
    }

    // Add a new job
    @PostMapping("/Jobposts")
    public void addJob(@RequestBody jobPost job) {
        jobService.addJob(job);
    }

    // ✅ Update job by ID
    @PutMapping("/Jobposts/{postid}")
    public jobPost update(@PathVariable Integer postid, @RequestBody jobPost updatedJob) {
        updatedJob.setPostid(postid);  // Ensure ID is set
        return jobService.update(updatedJob);
    }

    // ✅ Delete job by ID
    @DeleteMapping("/Jobposts/{postid}")
    public String deleteJob(@PathVariable Integer postid) {
        jobService.delete(postid);
        return "Successfully deleted";
    }

    // Load test data
    @GetMapping("/load")
    public String loaddata() {
        jobService.load1();
        return "Successfully loaded data";
    }
}

