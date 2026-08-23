export const isSameCity = (firstCity, secondCity) => {
  if (firstCity.id != null && firstCity.id === secondCity.id) {
    return true;
  }

  const firstName = firstCity.city?.trim().toLowerCase();
  const secondName = secondCity.city?.trim().toLowerCase();

  const firstCountry = firstCity.country?.trim().toLowerCase();
  const secondCountry = secondCity.country?.trim().toLowerCase();

  return (
    firstName &&
    secondName &&
    firstName === secondName &&
    firstCountry === secondCountry
  );
};