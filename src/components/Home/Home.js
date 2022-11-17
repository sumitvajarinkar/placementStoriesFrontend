import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExperiences } from "../../actions/experiences";
import { Container, Grow, Grid } from "@material-ui/core";
import Experiences from "../Experiences/Experiences";
import Form from "../Form/Form";


const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExperiences());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Experiences setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
