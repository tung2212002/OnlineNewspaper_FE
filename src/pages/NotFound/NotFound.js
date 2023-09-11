import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import { images } from '../../assets';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function NotFound() {
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Không tìm thấy tài nguyên | Project3</title>
            </Helmet>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <h1 className={cx('desc')}>Không tìm thấy tài nguyên</h1>
                    <div className={cx('container')}>
                        <img src={images.gif404} alt="logo" />
                    </div>
                </div>
            </div>
            <div className={cx('backHome')}>
                <Link to="/" className={cx('backHomeBtn')}>
                    Quay về trang chủ
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
