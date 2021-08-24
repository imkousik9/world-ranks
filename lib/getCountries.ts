import { ICountries } from './type';

export async function getCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all');

  const countries = await res.json();

  return countries as Array<ICountries>;
}
