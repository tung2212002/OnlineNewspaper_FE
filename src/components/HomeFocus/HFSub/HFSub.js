import { useEffect, useState } from 'react';
import style from './HFSub.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { getListsPostByCategoryService } from '../../../services/postService';

const cx = classNames.bind(style);

function HFSub() {
    const [data, setData] = useState(null);
    const [active, setActive] = useState('TAD1');

    const fetchData = async () => {
        const params = {
            filter_by: active === 'TAD1' ? '' : 'view',
            count: 5,
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
    }, [active]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box-tad')}>
                    <span className={cx('tad', active == 'TAD1' ? 'active' : '')} onClick={() => setActive('TAD1')}>
                        Tin mới
                    </span>
                    <span className={cx('tad', active == 'TAD2' ? 'active' : '')} onClick={() => setActive('TAD2')}>
                        Đọc nhiều
                    </span>
                </div>
                <div className={cx('box-content')}>
                    {active === 'TAD1' && (
                        <div className={cx('content')}>
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <div className={cx('box-item', 'nav-link')} key={index}>
                                            <Link className={cx('item')} to={item.id}>
                                                {item.title}
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                    {active === 'TAD2' && (
                        <div className={cx('content')}>
                            {/* {itemsTad2.map((item, index) => {
                                return (
                                    <div className={cx('box-item', 'nav-link')} key={index}>
                                        <Link className={cx('item')} to={item.link}>
                                            {item.name}
                                        </Link>
                                    </div>
                                );
                            })} */}
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <div className={cx('box-item', 'nav-link')} key={index}>
                                            <Link className={cx('item')} to={item.id}>
                                                {item.title}
                                            </Link>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                <Link className={cx('view-more', 'nav-link')} to="/abc">
                    Xem thêm
                </Link>
            </div>
        </div>
    );
}

export default HFSub;
