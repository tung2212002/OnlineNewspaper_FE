import { useContext, useEffect } from 'react';
import SearchComponent from '../../components/Search/SearchComponent';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import ParamContext from '../../context/ParamContext';

const cx = classNames.bind(styles);

function Search() {
    const { q } = useContext(ParamContext);
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const type = url.searchParams.get('type');
    const query = q ? q : url.searchParams.get('q');
    const filter = url.searchParams.get('filter');
    const { param, setParam } = useContext(ParamContext);

    useEffect(() => {
        setParam(null);
    }, []);
    return (
        <div className={cx('wrapper')}>
            <SearchComponent params={{ type, q: query, filter }} />
        </div>
    );
}

export default Search;
