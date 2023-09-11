import { useParams } from 'react-router-dom';
import Find from '../../components/Find/Find';
import styles from './FindTags.module.scss';
import classNames from 'classnames/bind';
import { Helmet } from 'react-helmet-async';
import { useContext, useEffect } from 'react';
import ParamContext from '../../context/ParamContext';

const cx = classNames.bind(styles);

function FindTags() {
    const { tag_name } = useParams();
    const { param, setParam } = useContext(ParamContext);

    useEffect(() => {
        setParam(null);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>{`${tag_name ? tag_name : ''} | Project3`}</title>
            </Helmet>
            <div className={cx('container')}>
                <Find type={'tag'} params={{ tag_name }} />
            </div>
        </div>
    );
}

export default FindTags;
