import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createExperience, updateExperience } from "../../actions/experiences";

const Form = ({ currentId, setCurrentId }) => {
  const [experienceData, setExperienceData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  const experience = useSelector((state) =>
    currentId ? state.experiences.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (experience) setExperienceData(experience);
  }, [experience]);

  const clear = () => {
    setCurrentId(0);
    setExperienceData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(
        createExperience({ ...experienceData, name: user?.result?.name })
      );
      clear();
    } else {
      dispatch(
        updateExperience(currentId, {
          ...experienceData,
          name: user?.result?.name
        })
      );
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please SignIn / SignUp to create your own placement stories and like
          other's stories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a experience
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="title"
          fullWidth
          value={experienceData.title}
          onChange={(e) =>
            setExperienceData({ ...experienceData, title: e.target.value })
          }
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          value={experienceData.message}
          onChange={(e) =>
            setExperienceData({ ...experienceData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={experienceData.tags}
          onChange={(e) =>
            setExperienceData({
              ...experienceData,
              tags: e.target.value.split(","),
            })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setExperienceData({ ...experienceData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {currentId ? "Update" : "Submit"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
