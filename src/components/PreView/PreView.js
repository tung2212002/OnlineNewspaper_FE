import { Link } from 'react-router-dom';
import styles from './PreView.module.scss';
import classNames from 'classnames/bind';
import CusTomStyles from '../../assets/CustomQuill.module.scss';
import 'react-quill/dist/quill.snow.css';

const cx = classNames.bind(styles);

function PreView({ categoryMain, categorySub, content, sapo, tags, bodyHTML }) {
    return (
        <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('detail-top')}>
                        <Link className={cx('main-category')} to={'/' + encodeURIComponent(categoryMain)}>
                            {categoryMain}
                        </Link>
                        {categoryMain && (
                            <Link className={cx('sub-category')} to={'/' + encodeURIComponent(categoryMain) + '/' + encodeURIComponent(categorySub)}>
                                {categorySub}
                            </Link>
                        )}
                    </div>
                    <div className={cx('detail-title')}>
                        <h1>
                            <span>{content}</span>
                        </h1>
                    </div>
                    <div className={cx('detail-content')}>
                        <div className={cx('detail-content-main')}>
                            <h2 className={cx('detail-sapo')}>{sapo}</h2>
                            <div className={cx('detail-main')}>
                                <div className={cx( 'ql-snow')}>
                                    <div className={cx('bodyHTML_post',CusTomStyles['ql-editor'], 'ql-editor')} dangerouslySetInnerHTML={{ __html: bodyHTML }}></div>
                                </div>
                            </div>
                            <div className={cx('detail-tags')}>
                                {tags.map((item, index) => (
                                    <Link key={index} to={'/tag/' + encodeURIComponent(item)} className={cx('detail-tag')}>
                                        {item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className={cx('detail-sub')}></div>
                    </div>
                </div>
        </div>
    );
}

export default PreView;
