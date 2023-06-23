import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { createComment } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './index';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('Comment Added Successfully', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
    }
  };

  <div className={styles.postWrapper} key={`post-${post._id}`}>
    <div className={styles.postHeader}>
      <div className={styles.postAvatar}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt="user-pic"
        />
        <div>
          <Link
            className={styles.postAuthor}
            to={{
              pathname: `/user/${post.user._id}`,
              state: {
                user: post.user,
              },
            }}
          >
            {post.user.name}
          </Link>
          <span className={styles.postTime}>a minute ago</span>
        </div>
      </div>
      <div className={styles.postContent}>{post.content}</div>

      <div className={styles.postActions}>
        <div className={styles.postLike}>
          <img
            src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
            alt="likes-icon"
          />
          <span>{post.likes.length}</span>
        </div>

        <div className={styles.postCommentsIcon}>
          <img
            src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
            alt="comments-icon"
          />
          <span>{post.comments.length}</span>
        </div>
      </div>
      <div className={styles.postCommentBox}>
        <input
          placeholder="Start typing a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleComment}
        />
      </div>

      <div className={styles.postCommentsList}>
        {post.comments.map((comment) => (
          <Comment comment={comment} key={`post-comment-${comment._id}`} />
        ))}
      </div>
    </div>
  </div>;
};
