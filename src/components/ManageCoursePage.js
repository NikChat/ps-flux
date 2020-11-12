import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => { // we declare code we want to run when this component loads
    courseStore.addChangeListener(onChange); // Run onChange function when the Flux store changes
    const slug = props.match.params.slug; // read the slug from the path `/courses/:slug`
    if (courses.length === 0) { // if the user loads the page directly, courses may not be loaded in the Flux store yet
      courseActions.loadCourses();
    } 
    else if (slug) { // if slug is in the url
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange); // will run on un-mount
  }, [courses.length, props.match.params.slug]); // If the page loads directly, first if will be executed, courses.length will change -> the effect will re-run

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange({ target }) { // event.target
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0; // returns an array of an object's keys
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses"); // Programmatic Redirect to the CoursesPage with React Router (instead of <Redirect>)
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
