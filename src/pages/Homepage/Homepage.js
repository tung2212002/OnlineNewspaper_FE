import { useContext, useEffect } from 'react';
import { Helmet} from "react-helmet-async";
import HomeFocus from '../../components/HomeFocus/HomeFocus';
import NewsSub from '../../components/NewsSub/NewsSub';
import styles from './Homepage.module.scss';
import classNames from 'classnames/bind';
import ParamContext from '../../context/ParamContext';

const cx = classNames.bind(styles);

function HomePages() {
    const { setParam } = useContext(ParamContext);
    useEffect(() => {
        setParam('');
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>Trang chủ | Project3</title>
            </Helmet>
            <div className={cx('container')}>
                <HomeFocus />
                <NewsSub />
            </div>
        </div>
    );
}

export default HomePages;
