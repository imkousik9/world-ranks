import { MdSearch } from 'react-icons/md';
import styles from './SearchInput.module.css';

export default function SearchInput({ ...rest }) {
  return (
    <div className={styles.wrapper}>
      <MdSearch color="inherit" />
      <input className={styles.input} {...rest} />
    </div>
  );
}
