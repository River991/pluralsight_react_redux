import expect from "expect";
import React from "react";
import TestUtils from "react-addons-test-utils";
import CourseForm from "../../../src/components/course/courseForm";

function setUp(saving) {
  let props = {
    course: {},
    loading: saving,
    errors: {},
    allAuthors: [],
    onSave: () => {},
    onChange: () => {}
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<CourseForm {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe("CourseForm via React Test Utils", () => {
  it("renders form and h1", () => {
    const { output } = setUp();
    expect(output.type).toBe("form");
    let [h1] = output.props.children;
    expect(h1.type).toBe("h1");
  });

  it('save button is labeled "Save" when not saving.', () => {
    const { output } = setUp(false);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe("Save");
  });

  it('save button is labeled "Saving..." when saving.', () => {
    const { output } = setUp(true);
    const submitButton = output.props.children[5];
    expect(submitButton.props.value).toBe("Saving...");
  });
});
