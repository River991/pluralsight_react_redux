import expect from "expect";
import React from "react";
import { mount, shallow } from "enzyme";
import CourseForm from "../../../src/components/course/courseForm";

function setUp(saving) {
  const props = {
    course: {},
    loading: saving,
    errors: {},
    allAuthors: [],
    onSave: () => {},
    onChange: () => {}
  };

  return shallow(<CourseForm {...props} />);
}

describe("CourseForm via Enzyme", () => {
  it("renders form and h1", () => {
    const wrapper = setUp(false);
    expect(wrapper.find("form").length).toBe(1);
    expect(wrapper.find("h1").text()).toBe("Manage Course");
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setUp(false);
    expect(wrapper.find("input").props().value).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving.', () => {
    const wrapper = setUp(true);
    expect(wrapper.find("input").props().value).toBe("Saving...");
  });
});
