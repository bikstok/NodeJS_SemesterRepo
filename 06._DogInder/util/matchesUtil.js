import { faker, fakerEN_IN } from "@faker-js/faker";

export async function getMatches(amountOfMatches = 5) {
  const promises = [];

  for (let i = 0; i <= amountOfMatches; i++) {
    const promise = fetch("https://dog.ceo/api/breeds/image/random").then(
      (response) => response.json()
    );

    promises.push(promise);
  }

  const results = await Promise.all(promises);
  const matches = results.map((result) => ({imageURL: result.message, ...getIndianProfile(),
  }));

  return matches;
}

console.log(await getMatches(2));

function getIndianProfile() {
  return {
    name: fakerEN_IN.person.fullName(),
    bio: fakerEN_IN.person.bio(),
    adress: fakerEN_IN.location.streetAddress(),
    city: fakerEN_IN.location.city(),
  };
}
console.log(getIndianProfile());
