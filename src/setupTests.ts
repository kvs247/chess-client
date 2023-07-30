// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";

React.useLayoutEffect = React.useEffect;
Enzyme.configure({ adapter: new Adapter() });
window.URL.createObjectURL = jest.fn();
