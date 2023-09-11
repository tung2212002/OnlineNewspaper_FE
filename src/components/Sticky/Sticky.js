import styles from './Sticky.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Sticky() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}></div>
        </div>
    );
}

export default Sticky;
