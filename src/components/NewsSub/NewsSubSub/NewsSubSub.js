import { Link } from 'react-router-dom';
import styles from './NewsSubSub.module.scss';
import classNames from 'classnames/bind';
import BoxNews from '../../BoxNews/BoxNews';
import { useState } from 'react';
import { getListsPostByCategoryService } from '../../../services/postService';

const cx = classNames.bind(styles);

function NewsSubSub() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const params = {
            main_category: 'Giới trẻ',
            count: 4,
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

    useState(() => {
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-category')}>
                    <h2 className={cx('title')}>
                        <Link to="/category/Giới trẻ" className={cx('link')}>
                            Giới trẻ
                        </Link>
                    </h2>
                </div>
                {data && (
                    <div>
                        <div className={cx('box-content-main')}>
                            {data[0] && <BoxNews image={data[0].thumbnail} title={data[0].title} typeLayout="col" link={data[0].id} />}
                            {/* <BoxNews image={data[0].thumbnail} title={data[0].title} typeLayout="col" link={data[0].id} /> */}
                        </div>
                        <div className={cx('box-content-sub')}>
                            {data.slice(1, 4).map((item, index) => {
                                return <BoxNews image={item.thumbnail} title={item.title} typeLayout="row" link={item.id} key={index} />;
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsSubSub;
