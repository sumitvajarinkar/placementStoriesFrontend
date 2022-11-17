import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes";

export default (experiences = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
      return experiences.map((experience) =>
        experience._id === action.payload._id ? action.payload : experience
      );
    case CREATE:
      return [...experiences, action.payload];
    case UPDATE:
      return experiences.map((experience) =>
        experience._id === action.payload._id ? action.payload : experience
      );

    case DELETE:
      return experiences.filter(
        (experience) => experience._id !== action.payload
      );

    default:
      return experiences;
  }
};
