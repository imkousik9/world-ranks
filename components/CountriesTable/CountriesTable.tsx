import { useState } from 'react';
import NextLink from 'next/link';
import SortArrow from './SortArrow';
import styles from './CountriesTable.module.css';

import { ICountries } from '../../lib/type';
import { orderBy } from '../../lib/orderBy';
import Image from 'next/image';

type CountryListProps = {
  countries: Array<ICountries>;
};

export default function CountriesTable({ countries }: CountryListProps) {
  const [direction, setDirection] = useState<string | null>(null);
  const [value, setValue] = useState<string>('');

  const orderedCountries = orderBy(countries, value, direction);

  const setValueAndDirection = (value: string) => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }

    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>

          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>

          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>
            Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>

          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>

          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map((country) => (
        <NextLink href={`/country/${country.alpha3Code}`} key={country.name}>
          <a className={styles.row}>
            <div className={styles.flag}>
              <Image
                src={country.flag}
                alt={country.name}
                width={200}
                height={130}
              />
            </div>
            <div className={styles.name}>{country.name}</div>

            <div className={styles.population}>{country.population}</div>

            <div className={styles.area}>{country.area || 0}</div>

            <div className={styles.gini}>{country.gini || 0} %</div>
          </a>
        </NextLink>
      ))}
    </div>
  );
}
