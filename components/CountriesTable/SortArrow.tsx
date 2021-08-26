import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import styles from './CountriesTable.module.css';

interface Props {
  direction: string | null;
}

function SortArrow({ direction }: Props) {
  if (!direction) {
    return <></>;
  }

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <MdKeyboardArrowDown color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <MdKeyboardArrowUp color="inherit" />
      </div>
    );
  }
}

export default SortArrow;
