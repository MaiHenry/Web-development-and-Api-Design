import { postJSON } from "../components/apiRequests/postJSON";

global.fetch = jest.fn();

describe("postJSON function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("sends data", async () => {
    const mockData = { response: "data received" };
    const mockRequestBody = JSON.stringify({ data: "new data" });

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });

    const response = await postJSON("http://chatroom.com/post", {
      data: "new data",
    });

    expect(fetch).toHaveBeenCalledWith("http://chatroom.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: mockRequestBody,
    });

    expect(response).toEqual(mockData);
  });
});
