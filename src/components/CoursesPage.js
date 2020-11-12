import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);  // 1. Subscribe to Flux store -> onChange will be called when the store changes
    if (courses.length === 0) loadCourses(); // 2. If courses haven't been loaded, call loadCourses action
    return () => courseStore.removeChangeListener(onChange); // cleanup on unmount
  }, [courses.length]);  // second argument: The depedency array is a list of values that useEffect should watch. 
                        // It re-runs when values in this array change. Here it will run only 1 time.
                       // without the second argument: Calling setCourses causes the component to re-render, which caused useEffect to re-run

  function onChange() {
    setCourses(courseStore.getCourses()); // get list of courses and update state, when courses are added to the store
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursesPage;
