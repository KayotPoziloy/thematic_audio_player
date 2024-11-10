export {}
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
    // eslint-disable-next-line
    require("../index.tsx");
    expect(mockRender).toHaveBeenCalled();
  });
});
