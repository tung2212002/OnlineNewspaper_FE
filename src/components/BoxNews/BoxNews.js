import { Link } from 'react-router-dom';
import styles from './BoxNews.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const BoxNews = ({ image, tag = '', title = '', sapo = '', typeLayout, link = '/', className, style, width, height, ...props }) => {
    const MAX_CONTENT_LENGTH = props.maxContentLength || 100;
    const MAX_SAPO_LENGTH = props.maxSapoLength || 100;
    return (
        <div className={cx('box-news', typeLayout, className)} style={style}>
            {typeLayout === 'col' && (
                <div className={cx('news-vertical')}>
                    {image && (
                        <Link to={link}>
                            <img src={image} alt="news" className={cx('news-image')} style={{ width: width, height: height }} />
                        </Link>
                    )}
                    <div className={cx('news-details')}>
                        <span className={cx('news-tag')}>{tag}</span>
                        <Link className={cx('news-title')} to={link}>
                            <h2 className={cx('news-title', 'nav-link')}>
                                {title.length > MAX_CONTENT_LENGTH ? title.substring(0, MAX_CONTENT_LENGTH) + '...' : title}
                            </h2>
                        </Link>
                        <p className={cx('news-content')}>{sapo.length > MAX_SAPO_LENGTH ? sapo.substring(0, MAX_SAPO_LENGTH) + '...' : sapo}</p>
                    </div>
                </div>
            )}
            {typeLayout === 'row' && (
                <div className={cx('news-horizontal')}>
                    {image && (
                        <Link to={link}>
                            <img src={image} alt="news" className={cx('news-image')} style={{ width: width, height: height }} />
                        </Link>
                    )}
                    <div className={cx('news-details')}>
                        <span className={cx('news-tag')}>{tag}</span>
                        <Link className={cx('news-title')} to={link}>
                            <h2 className={cx('news-title', 'nav-link')}>
                                {title.length > MAX_CONTENT_LENGTH ? title.substring(0, MAX_CONTENT_LENGTH) + '...' : title}
                            </h2>
                        </Link>
                        <p className={cx('news-content')}>{sapo.length > MAX_SAPO_LENGTH ? sapo.substring(0, MAX_SAPO_LENGTH) + '...' : sapo}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoxNews;
