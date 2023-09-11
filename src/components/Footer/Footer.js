import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { footerBottomIcon, footerMiddleMenu, footerTopMenu, images, info } from '../../assets';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('footer-top')}>
                {footerTopMenu.map((item, index) => (
                    <div key={index} className={cx('col')}>
                        <div className={cx('footer-top-item')}>
                            <Link to={item.url?item.url:`/category/${item.nameItem}`} className={cx('nav-link')}>
                                {item.nameItem}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('footer-middle')}>
                <a className={cx('logo')} href="/">
                    <img src={images.logo.default} alt="logo" />
                </a>
                <div className={cx('footer-middle-content')}>
                    <div className={cx('footer-middle-list')}>
                        {footerMiddleMenu.map((item, index) => (
                            <Link to={item.url} className={cx('footer-middle-link')} key={index}>
                                {item.nameItem}
                            </Link>
                        ))}
                    </div>
                    <div className={cx('footer-middle-social')}>
                        <span className={cx('footer-middle-social-title')}>Theo dõi báo trên</span>
                        <div className={cx('footer-middle-social-list')}>
                            {footerBottomIcon.map((item, index) => (
                                <a href={item.url} className={cx('footer-middle-social-link')} key={index}>
                                    <img src={item.icon.default} alt="icon" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer-bottom')}>
                <div className={cx('footer-bottom-contact')}>
                    <p className={cx('text')}>Hotline</p>
                    <p className={cx('value')}>{info.hotline}</p>
                    <p className={cx('text')}>Liên hệ quảng cáo</p>
                    <p className={cx('value')}>{info.contactAdv}</p>
                </div>
                <div className={cx('footer-bottom-info')}>
                    <p className={cx('text')}>Tổng biên tập: {info.editor}</p>
                    <p className={cx('text')}>Phó Tổng biên tập: {info.defutyEditor1}</p>
                    <p className={cx('text')}>Phó Tổng biên tập: {info.defutyEditor2}</p>
                    <p className={cx('text')}>Ủy viên Ban biên tập - Tổng Thư ký tòa soạn: {info.memberEBEC}</p>
                </div>
                <div className={cx('footer-bottom-copyright')}>{info.copyRight}</div>
            </div>
        </footer>
    );
};

export default Footer;
