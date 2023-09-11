import styles from './HeaderBottom.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubMenu from '../SubMenu/SubMenu';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { itemsNav } from '../../../assets/index.js';
const cx = classNames.bind(styles);

function HeaderBottom() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('position')}>
                <div className={cx('container')}>
                    <div className={cx('nav')}>
                        <ul className={cx('menu-nav')}>
                            <NavLink to="/" className={(nav) => cx('item-link', { active: nav.isActive })} exact="true" activeclassname="active">
                                <li className={cx('item', 'label', 'icon-house')}>
                                    <FontAwesomeIcon icon={faHouse} />
                                </li>
                            </NavLink>
                            {itemsNav.map((item, index) => {
                                return (
                                    <li className={cx('item')} key={index}>
                                        <SubMenu itemNav={item} />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className={cx('mega-menu')}></div>
            </div>
        </div>
    );
}

export default HeaderBottom;
