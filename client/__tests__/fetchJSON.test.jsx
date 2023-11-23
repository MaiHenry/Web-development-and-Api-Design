import { fetchJSON } from "../components/apiRequests/fetchJSON";

global.fetch = jest.fn();

describe("fetchJSON function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("gets data", async () => {
    const testData = { data: "some data" };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(testData),
    });
    const response = await fetchJSON("http://chatroom.com/data");
    expect(response).toEqual(testData);
  });
});
