import { useContext } from 'react';
import CreateNewsComponent from '../../components/CreateNewsComponent/CreateNewsComponent';
import NewsDetail from '../../components/NewsDetail/NewsDetail';
import PreView from '../../components/PreView/PreView';
import Sticky from '../../components/Sticky/Sticky';
import styles from './CreateNews.module.scss';
import classNames from 'classnames/bind';
import AuthContext from '../../context/AuthContext';
import NotFound from '../NotFound/NotFound';
import { Helmet} from "react-helmet-async";

const cx = classNames.bind(styles);

function CreateNews() {
    const { user } = useContext(AuthContext);
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Tạo bài viết | Project3</title>
            </Helmet>
            {user && user['groups'] && user['groups'].includes(1) ? (
                <div className={cx('container')}>
                    <CreateNewsComponent />
                </div>
            ) : (
                <div className={cx('container')}>
                    <NotFound />
                </div>
            )}
        </div>
    );
}

export default CreateNews;
