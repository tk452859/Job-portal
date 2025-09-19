package org.example.job_app1.repo;


import org.example.job_app1.model.jobPost;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public interface JobRespository extends JpaRepository<jobPost,Integer> {
    Integer postid(int postid);
    List<jobPost> findByPostid(int postid);

    // Search in multiple fields with same keyword
    List<jobPost> findByPostProfileContainingOrPostDescContaining(
            String postProfileKeyword,
            String postDescKeyword
    );


    /*List<jobPost> jobs = new ArrayList<>(Arrays.asList(
            new jobPost(1, "Backend Developer", "Develop REST APIs and microservices using Spring Boot", 2,
                    Arrays.asList("Java", "Spring Boot", "MySQL", "REST APIs")),

            new jobPost(2, "Frontend Engineer", "Build responsive user interfaces with modern frameworks", 1,
                    Arrays.asList("React", "JavaScript", "CSS", "HTML5")),

            new jobPost(3, "DevOps Specialist", "Manage cloud infrastructure and CI/CD pipelines", 3,
                    Arrays.asList("AWS", "Docker" )),

            new jobPost(4, "Data Scientist", "Analyze data and build machine learning models", 2,
                    Arrays.asList("Python", "SQL")),

            new jobPost(5, "Mobile Developer", "Develop cross-platform mobile applications", 1,
                    Arrays.asList("Flutter", "Dart",  "REST APIs"))
    ));
    public List<jobPost> getJobs(){
        return jobs;
    }
    public void addJob(jobPost jobPost){
        jobs.add(jobPost);
        System.out.println(jobs);
    }*/

}
