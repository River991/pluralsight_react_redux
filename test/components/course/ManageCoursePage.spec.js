import React from "react";
import expect from "expect";
import { mount, shallow } from "enzyme";
import "../../../src/components/course/ManageCoursePage";
import { ManageCoursePage } from "../../../src/components/course/ManageCoursePage";

describe("Manage course page", () => {
  it("sets an error message when trying to save a course without a title", () => {
    const props = {
      actions: {
        saveCourse: () => {
          return Promise.resolve();
        }
      },
      authors: [],
      course: {
        id: "",
        watchHref: "",
        title: "",
        authorId: "",
        length: "",
        category: ""
      }
    };

    const wrapper = mount(<ManageCoursePage {...props} />);

    const saveButton = wrapper.find("input").last();
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate("click");
    expect(wrapper.state().errors.title).toBe(
      "Title must be at least 5 chararacters long"
    );
  });
});
