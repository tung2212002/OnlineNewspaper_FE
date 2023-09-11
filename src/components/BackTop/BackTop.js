import { useState, useEffect } from 'react';
import styles from './BackTop.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const BackTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleBackTop = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleBackTop);
        return () => {
            window.removeEventListener('scroll', handleBackTop);
        };
    }, []);

    return (
        <button onClick={scrollToTop} className={cx('btn-Top', isVisible ? 'visible' : '')}>
            <FontAwesomeIcon icon={faArrowUp} />
            <div>TOP</div>
        </button>
    );
};

export default BackTop;
