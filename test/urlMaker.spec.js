import urlMaker from "../utils/urlMaker";

describe('Testing urlMaker plain js method', () => {
  test('Test url maker with queryObj', () => {
    const json = {
            lat: '',
            long: '',
            posField: 'New York',
            langField: 'nodejs'
          },
          url = urlMaker.makeUrl('/test', json);

    expect(url).toBe("/test?location=New York&description=nodejs")
  })

  test('Test url maker with id', () => {
    const query = '123-abc',
          url = urlMaker.makeUrl('/test', query);

    expect(url).toBe("/test/123-abc.json");
  })

  test('Test url maker with lat and long', () => {
    const json = {
            lat: "123",
            long: "abc",
            posField: "",
            langField: "nodejs"
          },
          url = urlMaker.makeUrl('/test', json);

    expect(url).toBe("/test?lat=123&long=abc&description=nodejs");
  })
})