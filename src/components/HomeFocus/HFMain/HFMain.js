import style from './HFMain.module.scss';
import classNames from 'classnames/bind';
import BoxNews from '../../BoxNews/BoxNews';
import { Link } from 'react-router-dom';
import BoxNewsTag from '../../BoxNewsTag/BoxNewsTag';
import { useEffect, useState } from 'react';
import { getListsPostByCategoryService } from '../../../services/postService';

const cx = classNames.bind(style);

function HFMain() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const style = {
        padding: '0 16px',
        borderRight: '1px solid #ebebeb',
    };

    const MAX_CONTENT_LENGTH = 100;

    const fetchData = async () => {
        const params = {
            main_category: 'Thời sự',
            count: 4,
        };
        try {
            const response = await getListsPostByCategoryService(params);
            if (response.status === 200) {
                setData(response.data);
                setLoading(false);
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
                {data && data.length > 0 && (
                  <div className={cx('item-first')}>
                  <Link to={data[0].id}>
                      <img
                          src={data[0].thumbnail}
                          alt={data[0].title}
                          className={cx('news-image')}
                          title={data[0].title}
                      />
                  </Link>
                  <div className={cx('news-details')}>
                      <Link className={cx('news-title')} to={data[0].id}>
                          <h2 className={cx('news-title')}>{data[0].title}</h2>
                      </Link>
                      <p className={cx('news-content')}>
                          {data[0].sapo.length > MAX_CONTENT_LENGTH
                              ? data[0].sapo.substring(0, MAX_CONTENT_LENGTH) + '...'
                              : data[0].sapo}
                      </p>
                  </div>
              </div>
                )}
                <div className={cx('items-related')}>
                    {data && data.slice(1).map((item, index) => {
                        return (
                            <BoxNews
                                key={index}
                                title={item.title}
                                sapo={item.sapo}
                                typeLayout="col"
                                link={item.id}
                                style={style}
                            />
                        );
                    })}
                </div>
                <BoxNewsTag />
            </div>
        </div>
    );
}

export default HFMain;
