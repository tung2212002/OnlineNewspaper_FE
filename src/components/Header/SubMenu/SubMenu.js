import styles from './SubMenu.module.scss';
import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { getListsPostByCategoryService } from '../../../services/postService';
import ParamContext from '../../../context/ParamContext';

const cx = classNames.bind(styles);

function SubMenu({ itemNav }) {
    const { param } = useContext(ParamContext);
    const [itemsNews, setItemsNews] = useState([]);
    const [show, setShow] = useState(false);
    const [hidden, setHidden] = useState(false);
    const wrapperParentRef = useRef(null);
    const wrapperChildRef = useRef(null);

    const fetchData = async () => {
        const params = {
            main_category: itemNav.mainItem,
            count: 3,
        };
        try {
            const response = await getListsPostByCategoryService(params);
            if (response.status === 200) {
                setItemsNews(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleShow = () => {
        if (show) {
            setHidden(false);
            return;
        }

        setShow(true);
        fetchData();
    };

    const handleHiddenChild = (e) => {
        setHidden(true);
    };

    const handleHiddenParent = (e) => {
        setTimeout(() => {
            setHidden(true);
        }, 1);
    };

    return (
        <div className={cx('wrapper-sub')} onMouseEnter={handleShow} onMouseLeave={handleHiddenParent} ref={wrapperParentRef}>
            <NavLink to={`/category/${itemNav.mainItem}`} className={(nav) => cx('item-link', itemNav.mainItem === param ? 'active' : '', { active: nav.isActive })}>
                <div className={cx('label')}>{itemNav.mainItem}</div>
            </NavLink>
            {show && (
                <div className={cx('wrapper')} style={{ display: hidden ? 'none' : 'flex' }} ref={wrapperChildRef} onMouseLeave={handleHiddenChild}>
                    <div className={cx('category')}>
                        <Link className={cx('title')} to={`/category/${itemNav.mainItem}`} >
                            {itemNav.mainItem}
                        </Link>
                        <div className={cx('list')}>
                            {itemNav.items.map((item, index) => {
                                return (
                                    <Link className={cx('item')} to={`/category/${itemNav.mainItem}/${item.nameItem}`} key={index}>
                                        <span className={cx('label')}>{item.nameItem}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('news')}>
                        {itemsNews &&
                            itemsNews.map((item, index) => {
                                return (
                                    <div className={cx('box-category-item')} key={index}>
                                        <Link className={cx('image')} to={`/${item.id}`}>
                                            <img src={item.thumbnail} alt={item.title} />
                                        </Link>
                                        <Link className={cx('title')} to={`/${item.id}`}>
                                            <h3>{item.title}</h3>
                                        </Link>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubMenu;
