import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';

import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import AuthContext from '../../context/AuthContext';
import convertTimeAgo from '../../utils/converTimeAgo';
import { getCommentsService, postCommentService, postLikeCommentService } from '../../services/commentService';
import { useParams } from 'react-router-dom';
import { images } from '../../assets';

const cx = classNames.bind(styles);

function Comment({ setCountComment }) {
    const { user, showlogin, setShowlogin } = useContext(AuthContext);

    const { id } = useParams();

    const [data, setData] = useState({ comments: [], comments_count: 0 });
    const [count, setCount] = useState(3);
    const [index, setIndex] = useState(0);
    const [numberComment, setNumberComment] = useState(0);
    const [filter_by, setFilter_by] = useState(1);
    const [showButton, setShowButton] = useState(true);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const params = {
            count,
            index,
            filter_by,
        };
        try {
            const response = await getCommentsService(id, params);
            if (response.status === 200) {
                if (index > 0) {
                    const newData = data;
                    newData.comments = [...newData.comments, ...response.data.comments];
                    newData.comments_count = response.data.comments_count;
                    setData(newData);
                    setNumberComment(response.data.comments_count);
                    setCountComment(response.data.comments_count);
                } else if (index === 0) {
                    setData(response.data);
                    setNumberComment(response.data.comments_count);
                    setCountComment(response.data.comments_count);
                }
                if (response.data.comments.length >= count) {
                    setShowButton(true);
                } else {
                    setShowButton(false);
                }
            } else {
                setShowButton(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPostComment = async (e) => {
        const key = e.target.parentNode.getAttribute('data-key');
        const dataComment = {
            content: comment,
            parent: key,
        };
        try {
            const response = await postCommentService(id, dataComment);
            if (response.status === 201) {
                const newData = data;
                if (response.data.parent_id === null) {
                    newData.comments = [response.data, ...newData.comments];
                } else {
                    newData.comments.map((item) => {
                        if (item.id === response.data.parent) {
                            item.children = [response.data, ...item.children];
                        }
                        return item;
                    });
                }
                setData(newData);
                setComment('');
                setNumberComment(numberComment + 1);
                setCountComment(numberComment + 1);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleCheckLogin = () => {
        if (!user) {
            setShowlogin(!showlogin);
        } else {
            //show a div to input comment
        }
    };

    const handleLike = async (e) => {
        if (!user) {
            setShowlogin(!showlogin);
        } else {
            const id = e.target.getAttribute('id');
            try {
                const response = await postLikeCommentService(id);
                if (response.status === 200) {
                    const newData = data;
                    const filterData = (comments) => {
                        if (!comments) return;
                        return comments.map((comment, index) => {
                            if (String(comment.id) === String(id)) {
                                comment.is_like = !comment.is_like;
                                if (comment.is_like) {
                                    comment.like += 1;
                                } else {
                                    comment.like -= 1;
                                }
                            } else if (comment.children) {
                                comment.children = filterData(comment.children);
                            }
                            return comment;
                        });
                    };
                    newData.comments = filterData(newData.comments);
                    setData(newData);
                    setLoading(!loading)
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handlePostComment = (e) => {
        if (!user) {
            setShowlogin(!showlogin);
        } else {
            if (comment.trim() === '') return;
            fetchPostComment(e);
        }
    };

    const renderComment = (comments) => {
        if (!comments) return;
        return comments.map((comment, index) => (
            <div className={cx('item')} key={comment.id}>
                <div className={cx('avatar')}>
                    <img src={comment.avatar} alt="avatar" />
                </div>
                <div className={cx('item-content')}>
                    <div className={cx('user-name')}>{comment.name}</div>
                    <p className={cx('text-comment')}>{comment.content}</p>
                    <div className={cx('item-bottom')}>
                        <span className={cx('button-like')} type="button" >
                            {/* <FontAwesomeIcon icon={faThumbsUp} className={cx('icon-like', comment.is_like ? 'is-like' : '')} onClick={handleLike} id={comment.id} /> */}
                            {comment.is_like ? (
                                <img src={images.like} alt="like" className={cx('icon-like', 'is-like')} onClick={handleLike} id={comment.id} />
                            ) : (
                                <img src={images.nolike} alt="unlike" className={cx('icon-like','is-not-like')} onClick={handleLike} id={comment.id} />
                            )}
                            <span className={cx('like-count')}>{comment.like}</span>
                        </span>
                        <button className={cx('button-reply')} type="button" onClick={handleCheckLogin}>
                            Trả lời
                        </button>
                        <span className={cx('time-ago')}>{convertTimeAgo(comment.created_at)}</span>
                    </div>
                    {comment.children && renderComment(comment.children)}
                </div>
            </div>
        ));
    };
    
    useEffect(() => {
        fetchData();
    }, [filter_by, index]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header-box')}>
                    <div className={cx('label')}>Bình luận ({numberComment})</div>
                    <div className={cx('input-box')}>
                        <textarea
                            type="text"
                            placeholder="Nhập bình luận"
                            onFocus={handleCheckLogin}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div className={cx('button-box')}>
                        <button className={cx('button')} type="button" onClick={handlePostComment}>
                            Gửi bình luận
                        </button>
                        {user ? (
                            <div className={cx('info-box')}>
                                <div className={cx('avatar')}>
                                    <img src={user.profile_pic} alt="avatar" />
                                </div>
                                <div className={cx('name')}> {user.last_name + ' ' + user.first_name}</div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className={cx('comment-box')}>
                    <div className={cx('filter-box')}>
                        <span
                            onClick={() => {
                                setFilter_by(1);
                                setIndex(0);
                            }}
                            className={cx('filter', { active: filter_by === 1 })}
                        >
                            Quan tâm nhất
                        </span>
                        <span
                            onClick={() => {
                                setFilter_by(2);
                                setIndex(0);
                            }}
                            className={cx('filter', { active: filter_by === 2 })}
                        >
                            Mới nhất
                        </span>
                    </div>
                    <div className={cx('list-comment')}>{data && renderComment(data.comments)}</div>
                </div>
                {showButton && (
                    <div className={cx('load-more')} onClick={() => setIndex(index + count)}>
                        Xem thêm bình luận
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
