var person = {
  name: "Bill",
  age: 29,
  city: "Cairo",
  profession: "surfer",
};

console.log(person.profession); // surfer

var { city, profession } = person;

console.log(profession); // surfer
