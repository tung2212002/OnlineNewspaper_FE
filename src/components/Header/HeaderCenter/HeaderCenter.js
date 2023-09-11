import styles from './HeaderCenter.module.scss';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartBar,
    faSearch,
    faPodcast,
    faBullhorn,
    faNewspaper,
    faRightFromBracket,
    faPlus,
    faChevronDown,
    faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import { images } from '../../../assets';
import Login from '../../Login/Login';
import { useState } from 'react';
import ParamContext from '../../../context/ParamContext';

const cx = classNames.bind(styles);

function HeaderCenter() {
    const [isLogin, setIsLogin] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const { user, logoutUser, showlogin, setShowlogin } = useContext(AuthContext);
    const {q, setQ} = useContext(ParamContext);
    const navigate = useNavigate();

    const itemsRightHeader = [
        { nameItem: 'PODCAST', url: '', icon: faPodcast },
        { nameItem: 'QUẢNG CÁO', url: '', icon: faBullhorn },
        { nameItem: 'ĐẶT BÁO', url: '', icon: faNewspaper },
    ];

    const handleRedirectCreate = () => {
        navigate('/posts/create');
    };

    const handleShowList = () => {
        document.getElementById('list-logout').style.visibility = 'visible';
        document.getElementById('list-logout').style.opacity = '1';
    };

    const handleHideList = () => {
        document.getElementById('list-logout').style.visibility = 'hidden';
        document.getElementById('list-logout').style.opacity = '0';
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search?q=${valueSearch}`);
            setQ(valueSearch);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <div className={cx('fa-menu')}>
                        <FontAwesomeIcon icon={faChartBar} />
                    </div>
                    <div className={cx('fa-search')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={valueSearch}
                            onChange={(e) => setValueSearch(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
                <div className={cx('mid')}>
                    <a className={cx('logo')} href="/">
                        <img src={images.logo.default} alt="logo" />
                    </a>
                </div>
                <div className={cx('right')}>
                    {itemsRightHeader.map((item, index) => {
                        return (
                            <a className={cx('item')} href={item.nameItem} key={index}>
                                <span>{item.nameItem}</span>
                                <div className={cx('icon')}>
                                    <FontAwesomeIcon icon={item.icon} />
                                </div>
                            </a>
                        );
                    })}
                    {user ? (
                        <div className={cx('after-login')}>
                            {user['groups'] && user['groups'].includes(1) && (
                                <button className={cx('item')} type="button" onClick={handleRedirectCreate}>
                                    <span>Tạo bài</span>
                                    <div className={cx('icon')}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </button>
                            )}
                            <br />
                            <button className={cx('item', 'menu')} type="button" onClick={handleShowList}>
                                <div className={cx('container-login')}>
                                    <div className={cx('avatar')}>
                                        <img src={user.profile_pic} alt="avatar" />
                                    </div>
                                    <FontAwesomeIcon icon={faChevronDown} className={cx('icon-down')} />
                                </div>
                                <div className={cx('list-logout')} id="list-logout" onMouseLeave={handleHideList}>
                                    {user['groups'] && user['groups'].includes(1) && (
                                        <Link to="/posts/manage" className={cx('item', 'item-login')}>
                                            <FontAwesomeIcon icon={faListCheck} className={cx('icon-logout')} />
                                            <span>Quản lý bài viết</span>
                                        </Link>
                                    )}
                                    <div className={cx('item', 'item-login')} onClick={logoutUser} type="button">
                                        <FontAwesomeIcon icon={faRightFromBracket} className={cx('icon-logout')} />
                                        <span>Đăng xuất</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ) : (
                        <button className={cx('item')} type="button" onClick={() => setShowlogin(!showlogin)}>
                            <span>ĐĂNG NHẬP</span>
                            <div className={cx('icon')}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </div>
                        </button>
                    )}
                </div>
            </div>
            <div className={cx('login')}>{showlogin && <Login setIsLogin={setShowlogin} isLogin={showlogin} />}</div>
        </div>
    );
}

export default HeaderCenter;
