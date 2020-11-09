import React from "react";
import { getCourses } from "../api/courseApi";

class CoursesPage extends React.Component {
  state = { // class field syntax (instead of constructor)
    courses: []
  };

  componentDidMount() { // Request a list of courses when this page loads
    getCourses().then(courses => this.setState({ courses: courses })); // the function in .then() will be called when the API call is completed
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author ID</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(course => {
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default CoursesPage;
