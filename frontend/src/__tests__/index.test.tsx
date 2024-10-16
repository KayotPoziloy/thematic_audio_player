import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import { createRoot } from "react-dom/client";

const mockRender = jest.fn();
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => ({
      render: mockRender,
    })),
  }));

describe("/index.test.tsx", () => {
  it("index.tsx eval ReactDOM.createRoot(...).render function", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    require("../index.tsx");
    expect(mockRender).toHaveBeenCalled();
  });
});
