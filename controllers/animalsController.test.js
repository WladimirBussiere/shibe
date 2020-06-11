const {getAnimals, animalCall, renameKey} = require('./animalsController.js')

describe("renameKey function", () => {
  test("it should rename an object key without affect the value", () => {
    //given
    const input = {
      Key1: "first value",
      Key2: "second value",
      key3: "third value"
    }

    const oldName = "key3";
    const newName = "key3b";

    //when
    const output = renameKey(input, newName, oldName);

    //then
    expect(output).not.toHaveProperty('key3', 'third value');
    expect(output).toHaveProperty('key3b', 'third value');
  });
});
