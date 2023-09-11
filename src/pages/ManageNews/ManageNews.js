import styles from './ManageNews.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import BoxNews from '../../components/BoxNews/BoxNews';
import { deletePostService, managePostService } from '../../services/authorService';
import AuthContext from '../../context/AuthContext';
import NotFound from '../NotFound/NotFound';
import convertTime from '../../utils/convertTime';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';

const cx = classNames.bind(styles);

function ManageNews() {
    const MAX_CONTENT_LENGTH = 100;

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    const [numberPage, setNumberPage] = useState(1);
    const [numberPost, setNumberPost] = useState(0);
    const [showToast, setShowToast] = useState(false);

    const { user } = useContext(AuthContext);

    const fetchDataStart = async (param) => {
        const paramsGet = {
            index: (param - 1) * 12,
            count: 12,
        };

        try {
            const response = await managePostService(paramsGet);
            if (response.status === 200) {
                setData(response.data.posts);
                setNumberPage(Math.ceil(response.data.number_of_posts / 12));
                setNumberPost(response.data.number_of_posts);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickPage = (e) => {
        if (e.target.innerText == page) {
            return;
        }
        setPage(parseInt(e.target.innerText));
        fetchDataStart(e.target.innerText);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const handleDelete = async (id, title) => {
        const alert = window.confirm('Bạn có chắc chắn muốn xóa bài viết: ' + title);
        if (alert) {
            try {
                const response = await deletePostService(id);
                if (response.status === 200) {
                    handleShowToast('Thành công', 'Xóa bài viết thành công', 'success');
                    fetchDataStart(page);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleShowToast = (title, message, type) => {
        setShowToast({
            title: title,
            message: message,
            type: type,
        });
        setTimeout(() => {
            setShowToast(false);
        }, 2800);
    };

    useEffect(() => {
        fetchDataStart(page);
    }, []);

    return user && user['groups'] && user['groups'].includes(1) ? (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>{user.last_name + ' ' + user.first_name} | Project3</title>
            </Helmet>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1>Quản lý bài viết</h1>
                    <h2> Số bài viết : {numberPost} bài viết</h2>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('content-left', 'content-left-author')}>
                        <BoxNews
                            image={user.profile_pic}
                            title={user.last_name + ' ' + user.first_name}
                            sapo={user.email}
                            typeLayout="col"
                            height={300}
                            maxContentLength={MAX_CONTENT_LENGTH}
                            link={`/author/${user.id}`}
                        />
                    </div>
                    <div className={cx('content-right')}>
                        {data &&
                            data.slice(0, 2).map((item, index) => {
                                return (
                                    <div className={cx('box-news')} key={index}>
                                        <BoxNews
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            width={350}
                                            link={`/${item.id}`}
                                            sapo={convertTime(item.created_at)}
                                            height={200}
                                        />
                                        <Link to={`/posts/edit/${item.id}`}>
                                            <button className={cx('button-edit', 'btn')}>Sửa</button>
                                        </Link>
                                        <button className={cx('button-delete', 'btn')} onClick={() => handleDelete(item.id, item.title)}>
                                            Xóa
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('content-left')}>
                        {data &&
                            data.slice(2, 12).map((item, index) => {
                                return (
                                    <div className={cx('box-news')} key={index}>
                                        <BoxNews
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            height={205}
                                            width={310}
                                            sapo={convertTime(item.created_at)}
                                            tag={item.tags}
                                            link={`/${item.id}`}
                                        />
                                        <Link to={`/posts/edit/${item.id}`}>
                                            <button className={cx('button-edit', 'btn')}>Sửa</button>
                                        </Link>
                                        <button className={cx('button-delete', 'btn')} onClick={() => handleDelete(item.id, item.title)}>
                                            Xóa
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                <div className={cx('container')}>
                    <div className={cx('button-more')}>
                        {[...Array(numberPage)].map((_, index) => (
                            <button key={index} onClick={handleClickPage} className={cx('btn', { 'btn-active': index + 1 == page })}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('toast')}>{showToast && <Toast title={showToast.title} message={showToast.message} type={showToast.type} />}</div>
        </div>
    ) : (
        <div className={cx('wrapper')}>
            <NotFound />
        </div>
    );
}

export default ManageNews;
