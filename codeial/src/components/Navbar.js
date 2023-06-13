import styles from '../styles/navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href="/">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt=""
              className={styles.userDp}
            />
          </a>
          <span>Aakash</span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/login">Log in</a>
            </li>
            <li>
              <Link to="/">Log out</a>
            </li>
            <li>
              <Link to="/">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
