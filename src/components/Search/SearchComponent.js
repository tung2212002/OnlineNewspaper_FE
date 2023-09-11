import styles from './SearchComponent.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { SearchService } from '../../services/postService';
import BoxNews from '../BoxNews/BoxNews';
import NotFound from '../../pages/NotFound/NotFound';
import { Helmet } from 'react-helmet-async';

const cx = classNames.bind(styles);

function SearchComponent({ params }) {
    const MAX_CONTENT_LENGTH = 100;
    const MAX_SAPO_LENGTH = 200;
    const count = 15;

    const [type, setType] = useState(params.type ? params.type : 1);
    const [filter, setFilter] = useState(params.filter ? params.filter : 1);
    const [buttonMore, setButtonMore] = useState(false);
    const [data, setData] = useState(null);
    const [addData, setAddData] = useState(null);
    const [index, setIndex] = useState(0);
    const [notFound, setNotFound] = useState(false);

    const fetchDataStart = async () => {
        const paramsGet = {
            q: params.q.trim(),
            type,
            filter,
            count,
        };
        try {
            const response = await SearchService(paramsGet);
            if (response.status === 200) {
                if (response.data.length > 0) {
                    setNotFound(false);
                    setData(response.data);
                    setIndex(index + count);
                    if (response.data.length < count) {
                        setButtonMore(false);
                    } else {
                        setButtonMore(true);
                    }
                } else {
                    setNotFound(true);
                }
            } else {
                setNotFound(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMoreData = async () => {
        const paramsGet = {
            q: params.q,
            type,
            filter,
            index,
            count,
        };
        try {
            const response = await SearchService(paramsGet);
            if (response.status === 200) {
                if (response.data.length === 0) {
                    setButtonMore(false);
                } else if (response.data.length < count) {
                    setData([...data, ...response.data]);
                    setButtonMore(false);
                } else {
                    setData([...data, ...response.data]);
                    setIndex(index + count);
                    setButtonMore(true);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (params.q.trim() !== '') {
            fetchDataStart();
        }
    }, [params.q, type, filter]);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Trang tìm kiếm: {params.q ? params.q : 'Không tìm thấy'} | Project3</title>
            </Helmet>
            <div className={cx('container', 'container-header')}>
                <div className={cx('header')}>
                    <h1>Kết quả tìm kiếm cho: {params.q ? params.q : 'Không tìm thấy'}</h1>
                </div>
                <div className={cx('filter')}>
                    <div className={cx('filter-item')}>
                        <select onChange={(e) => setFilter(e.target.value)}>
                            <option value={1}>Bài viết</option>
                            <option value={2}>Tác giả</option>
                        </select>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value={1}>Mới nhất</option>
                            <option value={2}>Cũ nhất</option>
                            <option value={3}>Phổ biến nhất</option>
                        </select>
                    </div>
                </div>
            </div>
            {notFound ? (
                <NotFound />
            ) : (
                <div className={cx('container')}>
                    <div className={cx('container')}>
                        <div className={cx('content-left')}>
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <BoxNews
                                            key={index}
                                            image={item.thumbnail}
                                            title={item.title}
                                            typeLayout="row"
                                            height={205}
                                            width={310}
                                            sapo={item.sapo}
                                            tag={item.tags}
                                            maxSapoLength={MAX_SAPO_LENGTH}
                                            link={`/${item.id}`}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                    <div className={cx('container')}>
                        {buttonMore && (
                            <div className={cx('button-more')} onClick={fetchMoreData}>
                                <button>
                                    <span>Xem thêm</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchComponent;
