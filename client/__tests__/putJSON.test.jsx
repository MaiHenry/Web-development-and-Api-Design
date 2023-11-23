import { putJSON } from "../components/apiRequests/putJSON";

global.fetch = jest.fn();

describe("putJSON function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("updates data", async () => {
    const mockData = { response: "data updated" };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const response = await putJSON("http://chatroom.com/put", {
      data: "update data",
    });
    expect(response).toEqual(mockData);
  });
});
