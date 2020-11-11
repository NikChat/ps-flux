import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) { // this function is an Action Creator
  return courseApi.saveCourse(course).then(savedCourse => {
    // Hey dispatcher, go tell all the stores that a course was just created. Stores will take the data we dispatch here and use it.
    dispatcher.dispatch({ // We dispatch an Action
      actionType: actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}