import HFMain from './HFMain/HFMain';
import HFSub from './HFSub/HFSub';
import styles from './HomeFocus.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HomeFocus() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <HFMain/>
                <HFSub/>
            </div>
        </div>
    )
}

export default HomeFocus;