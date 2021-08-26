import { ICountries } from './type';

export const getCountry = async <T>(id: T) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await res.json();

  return country as ICountries;
};
