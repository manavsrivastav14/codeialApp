import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  const updateProfile = () => {};
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
          alt="user-image"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode ? (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input type="password" />
          </div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input type="password" />
          </div>
        </>
      ) : (
        <></>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.editBtn}`}
              onClick={updateProfile()}
            >
              {savingForm ? 'Saving Profile...' : 'Save'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
