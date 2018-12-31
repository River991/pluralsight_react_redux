import expect from "expect";
import thunk from "redux-thunk";
import nock from "nock";
import configureMockStore from "redux-mock-store";

import * as courseActions from "../../src/actions/courseActions";
import * as types from "../../src/actions/actionTypes";

describe("Course Actions", () => {
  describe("Create course success", () => {
    it("should create a CREATE_COURSE_SUCCESS action", () => {
      const course = { id: "clean-code", title: "Clean code" };

      const expectedAction = {
        type: types.CREATE_COURSE_SUCCESS,
        course: course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async actions", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it("Should create BEGIN_AJAX_CALL AND LOAD_COURSES_SUCCESS when loading courses", done => {
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      {
        type: types.LOAD_COURSES_SUCCESS,
        body: { courses: [{ id: "clean-code", title: "Clean Code" }] }
      }
    ];

    const store = mockStore({ courses: [] }, expectedActions);

    store.dispatch(courseActions.loadCourses()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
      done();
    });
  });
});
