import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './EditNews.module.scss';
import classNames from 'classnames/bind';
import AuthContext from '../../context/AuthContext';
import NotFound from '../NotFound/NotFound';
import EditNewsComponent from '../../components/EditNewsComponent/EditNewsComponent';

const cx = classNames.bind(styles);

function EditNews() {
    const { user } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Sửa bài viết | Project3</title>
            </Helmet>
            {user && user['groups'] && user['groups'].includes(1) ? (
                <div className={cx('container')}>
                    <EditNewsComponent />
                </div>
            ) : (
                <div className={cx('container')}>
                    <NotFound />
                </div>
            )}
        </div>
    );
}

export default EditNews;
