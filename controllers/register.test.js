/*
1. Given integer.
2. Return true is year is leap or false if not.
3. If given not valid argument throw error with message.

2008 - true
2003 - false
1900 - false
2000 - true

41 - error 'year must 42 or more'
2008.4 - error 'year must be integer'
() - error 'year must be exist'
'2008' - error 'year must be number'
null - error 'year must be number'
true - error 'year must be number'
false - error 'year must be number'
()=>{} - error 'year must be number'
{} - error 'year must be number'
[] - error 'year must be number'
*/

const register = require("./auth");

// ответ должен иметь статус-код 200
// в ответе должен возвращаться токен
// в ответе должен возвращаться объект user с 2 полями email и subscription, имеющие тип данных String

console.log(register);

describe("test register function", () => {
  test("the response must have a status code of 200", () => {
    const res = register(req, res);
    expect(res.status).toBe(200);
    /*
        const expect = result => {
            return {
                result,
                toBe(value) {
                    return this.result === value;
                }
            }
        }
        */
  });

  //   test("2003 - false", () => {
  //     expect(isLeapYear(2003)).toBe(false);
  //   });

  //   it("1900 - false", () => {
  //     expect(isLeapYear(1900)).toBe(false);
  //   });

  //   test("2000 - true", () => {
  //     expect(isLeapYear(2000)).toBe(true);
  //   });

  //   test("41 - error 'year must 42 or more'", () => {
  //     expect(() => isLeapYear(41)).toThrow("year must 42 or more");
  //   });

  //   test("2008.4 - error 'year must be integer'", () => {
  //     expect(() => isLeapYear(2008.4)).toThrow("year must be integer");
  //   });

  //   test("() - error 'year must be exist'", () => {
  //     expect(() => isLeapYear()).toThrow("year must be exist");
  //   });

  //   test("'2008' - error 'year must be number'", () => {
  //     expect(() => isLeapYear("2008")).toThrow("year must be number");
  //   });

  //   test("null - error 'year must be number'", () => {
  //     expect(() => isLeapYear(null)).toThrow("year must be number");
  //   });

  //   test("true - error 'year must be number'", () => {
  //     expect(() => isLeapYear(true)).toThrow("year must be number");
  //   });

  //   test("false - error 'year must be number'", () => {
  //     expect(() => isLeapYear(false)).toThrow("year must be number");
  //   });

  //   test("()=>{} - error 'year must be number'", () => {
  //     expect(() => isLeapYear(() => {})).toThrow("year must be number");
  //   });

  //   test("{} - error 'year must be number'", () => {
  //     expect(() => isLeapYear({})).toThrow("year must be number");
  //   });

  //   test("[] - error 'year must be number'", () => {
  //     expect(() => isLeapYear([])).toThrow("year must be number");
  //   });
});
