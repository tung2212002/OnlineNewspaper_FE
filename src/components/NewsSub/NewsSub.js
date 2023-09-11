import styles from './NewsSub.module.scss';
import classNames from 'classnames/bind';
import NewsSubMain from './NewsSubMain/NewsSubMain';
import NewsSubSub from './NewsSubSub/NewsSubSub';

const cx = classNames.bind(styles);

function NewsSub() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('news-sub-flex')}>
                    <div className={cx('news-sub-main')}>
                        <NewsSubMain filter_by={'today'} count={8} content={'Tin 24h'} />
                    </div>
                    <div className={cx('news-sub-sub')}>
                        <NewsSubSub />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsSub;
