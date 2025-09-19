import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const initial = { postid: "", postProfile: "", reqExperience: 0, postTechStack: [], postDesc: "" };

const Create = () => {
  const skillSet = [
    { name: "Javascript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Jobposts", form)
      .then((resp) => {
        console.log("Successfully added post:", resp.data);
        navigate("/"); // Navigate to home page after successful post
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  };

  const { postid, postProfile, reqExperience, postDesc } = form;

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      if (checked) {
        // Add skill if checked
        return {
          ...prevForm,
          postTechStack: [...prevForm.postTechStack, value],
        };
      } else {
        // Remove skill if unchecked
        return {
          ...prevForm,
          postTechStack: prevForm.postTechStack.filter((skill) => skill !== value),
        };
      }
    });
  };

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            onChange={(e) => setForm({ ...form, postid: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={postid}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={reqExperience}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={postDesc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention required skills</h3>
            <ul>
              {skillSet.map(({ name }, index) => (
                <li key={index}>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        onChange={handleChange}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Create;