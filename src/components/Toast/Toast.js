import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCircleXmark,
    faInfoCircle,
    faExclamationCircle,
    faX,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Toast({ title, message, type = 'info' }) {
    const icons = {
        info: faInfoCircle,
        success: faCircleCheck,
        error: faCircleXmark,
        warning: faExclamationCircle,
    };

    return (
        <div className={cx('wrapper', `wrapper-${type}`)}>
            <div className={cx('container', type)}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={icons[type]} className={cx(`btn-${type}`)} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('title')}>{title}</div>
                    <div className={cx('message')}>{message}</div>
                </div>
            </div>
            {/* <div className={cx('close')}>
                <FontAwesomeIcon icon={faX} className={cx('btn-close')} />
            </div> */}
        </div>
    );
}

export default Toast;
