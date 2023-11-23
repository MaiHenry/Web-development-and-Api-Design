import { deleteJSON } from "../components/apiRequests/deleteJSON";

global.fetch = jest.fn();
describe("deleteJSON function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("send delete request", async () => {
    const mockHeaders = {
      get: jest.fn().mockReturnValue("application/json"),
    };
    fetch.mockResolvedValue({
      ok: true,
      headers: mockHeaders,
      json: () => Promise.resolve({ message: "Delete successful" }),
    });
    const response = await deleteJSON("http://chatroom.com/delete");
    expect(response).toEqual({ message: "Delete successful" });
    expect(mockHeaders.get).toHaveBeenCalledWith("content-type");
  });
});
