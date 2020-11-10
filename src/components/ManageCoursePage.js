import React, { useState } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";

const ManageCoursePage = props => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  function handleChange({ target }) { // event.target
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses"); // Programmatic Redirect to the CoursesPage with React Router (instead of <Redirect>)
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
