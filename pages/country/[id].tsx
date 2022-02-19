import { useEffect, useState } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import type {
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from 'next';

import Layout from '../../components/Layout/Layout';
import { getCountries } from '../../lib/getCountries';
import { getCountry } from '../../lib/getCountry';

import styles from './Country.module.css';
import { ICountries } from '../../lib/type';

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await getCountries();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code }
  }));

  return {
    paths,
    fallback: false
  };
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const country = await getCountry(params?.id);

  return {
    props: {
      country
    },
    revalidate: 200
  };
}

export default function Country({
  country
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [borders, setBorders] = useState<ICountries[]>([]);

  useEffect(() => {
    const getBorders = async () => {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );

      setBorders(borders);
    };

    if (country.borders) {
      getBorders();
    }
  }, [country.borders]);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <Image
              src={country.flag}
              alt={country.name}
              width={600}
              height={400}
            />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {country.area || 'NA'}
                </div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital ? country.capital : 'NA'}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(', ')}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies
                  ? country.currencies?.map(({ name }) => name).join(', ')
                  : 'NA'}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country.gini ? `${country.gini} %` : 'NA'}
              </div>
            </div>

            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighboring Countries
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders?.map(({ flag, name, alpha3Code }) => (
                  <NextLink href={`/country/${alpha3Code}`} key={name}>
                    <a>
                      <div className={styles.details_panel_borders_country}>
                        <Image src={flag} alt={name} width={250} height={150} />

                        <div className={styles.details_panel_borders_name}>
                          {name}
                        </div>
                      </div>
                    </a>
                  </NextLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
