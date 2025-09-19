import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postid: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state ? location.state.id : null); // Handle case where location.state is null

  useEffect(() => {
    const fetchInitialPosts = async (id) => {
      // Check if the id is valid before making the request
      if (id) {
        try {
          // Corrected URL: changed 'jobPosts' to 'Jobposts' to match back-end
          const response = await axios.get(`http://localhost:8080/Jobposts/${id}`);
          console.log(response.data);
          setForm(response.data);
        } catch (error) {
          console.error("Error fetching post data:", error);
          // Optional: navigate back to the home page if the post can't be fetched
          navigate('/');
        }
      }
    };
    fetchInitialPosts(currId);
  }, [currId, navigate]); // Added 'navigate' to dependency array as a best practice

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/Jobposts/${form.postid}`, form)
      .then((resp) => {
        console.log("Successfully updated post:", resp.data);
        navigate('/');
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

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

  const skillSet = [
    {
      name: "Javascript",
    },
    {
      name: "Java",
    },
    {
      name: "Python",
    },
    {
      name: "Django",
    },
    {
      name: "Rust",
    },
  ];

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit New Post
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
            value={form.postid}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={form.postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
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
            value={form.postDesc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention required skills</h3>
            <ul>
              {skillSet.map(({ name }, index) => {
                return (
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
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {name}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
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

export default Edit;