import { postJSON } from "../components/apiRequests/postJSON";

global.fetch = jest.fn();

describe('postJSON function', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('sends data', async () => {
    const mockData = { response: 'data received' };
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    const response = await postJSON('http://example.com/post', { data: 'new data' });
    expect(response).toEqual(mockData);
  });
});
