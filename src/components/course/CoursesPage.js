import React, {PropTypes} from "react";
import {connect} from 'react-redux';
import * as courseAction from '../../actions/courseActions';

class CoursesPage extends React.Component {
  static courseRow(course, index) {
    return (<div key={index}>{course.title}</div>);
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      course: {"title": ""}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({course: course});
  }

  onClickSave() {
    this.props.dispatch(courseAction.createCourse(this.state.course));
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>

        {this.props.courses.map(CoursesPage.courseRow)}

        <h2>Add new course</h2>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.state.course.title}/>

        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps){
  return{
    courses: state.courses
  };
}
export default connect(mapStateToProps)(CoursesPage);
