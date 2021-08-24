import React from 'react';
import type { InferGetStaticPropsType } from 'next';
import { getCountries } from '../lib/getCountries';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import SearchInput from '../components/SearchInput/SearchInput';

export async function getStaticProps() {
  const countries = await getCountries();

  return {
    props: {
      countries
    }
  };
}

function Home({ countries }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [keyword, setKeyword] = React.useState('');

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout title="World Ranks">
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by Name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export default Home;
