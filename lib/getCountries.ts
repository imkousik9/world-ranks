import { ICountries } from './type';

export async function getCountries() {
  const res = await fetch('https://restcountries.com/v2/all');

  const countries = await res.json();

  return countries as Array<ICountries>;
}
