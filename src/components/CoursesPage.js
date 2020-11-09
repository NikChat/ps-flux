import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses().then(_courses => setCourses(_courses));
  }, []); // second argument: The depedency array is a list of values that useEffect should watch. 
          // It re-runs when values in this array change. Here it will run only 1 time.
          // without the second argument: Calling setCourses causes the component to re-render, which caused useEffect to re-run

  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
