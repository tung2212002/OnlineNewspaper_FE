import { Link } from 'react-router-dom';
import styles from './NewsSubMain.module.scss';
import classNames from 'classnames/bind';
import BoxNews from '../../BoxNews/BoxNews';
import { useEffect, useState } from 'react';
import { getListsPostByCategoryService } from '../../../services/postService';

const cx = classNames.bind(styles);

function NewsSubMain({ main_category = '', sub_category = '', count = 0, index = 0, filter_by = '', content = '' }) {
    const MAX_CONTENT_LENGTH = 50;
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const params = {
            main_category,
            sub_category,
            count,
            index,
            filter_by,
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

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('category')}>
                    <h2>
                        <Link to="/bcdt" className={cx('box-category')}>
                            {content}
                        </Link>
                    </h2>
                </div>
                <div className={cx('box-news')}>
                    {data &&
                        data.map((item, index) => {
                            return (
                                <div className={cx('box-news-item')} key={index}>
                                    <BoxNews image={item.thumbnail} title={item.title} content="" typeLayout="col" link={item.id} height={100} />
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default NewsSubMain;
