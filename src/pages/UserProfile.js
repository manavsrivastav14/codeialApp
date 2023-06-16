import { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { Loader } from '../components';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { fetchUserProfile } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useHistory();
  const auth = useAuth();

  console.log('UserId: ', userId);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return history.push('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userId, history, addToast]);

  // const location = useLocation();
  // console.log('Location:', location);
  // const { user = {} } = location.state;
  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const showAddFriendsBtn = checkIfUserIsAFriend();
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
          alt="user"
        />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <>
            <button className={`button ${styles.saveBtn}`}>
              Remove friend
            </button>
          </>
        ) : (
          <>
            <button className={`button ${styles.saveBtn}`}>Add friend</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;