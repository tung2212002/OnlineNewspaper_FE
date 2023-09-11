import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import styles from './SubPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function SubPage() {
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>SubPage | Project3</title>
            </Helmet>
            <h1>
                <Link to="/">BackHome</Link>
            </h1>

        </div>
    );
}

export default SubPage;
