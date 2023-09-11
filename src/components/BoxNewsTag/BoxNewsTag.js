import { Link } from 'react-router-dom';
import styles from './BoxNewsTag.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import { listTag } from '../../assets';
import { getListTagTrendingService, getListsPostByCategoryService } from '../../services/postService';
import { useEffect, useState } from 'react';
import NewsSubMain from '../NewsSub/NewsSubMain/NewsSubMain';

const cx = classNames.bind(styles);

function BoxNewsTag() {
    const [data, setData] = useState(null);
    const [tags, setTags] = useState(null);

    const fetchData = async () => {
        const params = {
            filter_by: 'month',
            count: 8,
        };
        try {
            const response = await getListsPostByCategoryService(params);
            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDataTag = async () => {
        const params = {
            filter_by: 'trending',
            count: 2,
        };
        try {
            const response = await getListTagTrendingService(params);
            if (response.status === 200) {
                setTags(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const MAX_CONTENT_LENGTH = 50;

    useEffect(() => {
        fetchData();
        fetchDataTag();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-news-tag')}>
                    <div className={cx('btn-news')}>
                        <span className={cx('icon')}>
                            <FontAwesomeIcon icon={faArrowTrendUp} />
                        </span>
                        <span className={cx('text')}>Tiêu điểm</span>
                    </div>
                    <div className={cx('list-tag')}>
                        {tags &&
                            tags.slice(0, 2).map((item, index) => {
                                return (
                                    <Link className={cx('item')} to={`/tags/${item.tag_name}`} key={index}>
                                        {item.tag_name > MAX_CONTENT_LENGTH ? item.tag_name.slice(0, MAX_CONTENT_LENGTH) + '...' : item.tag_name}
                                    </Link>
                                );
                            })}
                    </div>
                </div>
                <NewsSubMain count={8} filter_by={'month'} />
            </div>
        </div>
    );
}

export default BoxNewsTag;
