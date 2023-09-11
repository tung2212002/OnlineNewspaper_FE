import { Helmet} from "react-helmet-async";
import Find from '../../components/Find/Find';
import styles from './FindCategory.module.scss';
import classNames from 'classnames/bind';
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function FindCategory() {
    const {main_category, sub_category} = useParams();
    return (
        <div className={cx('wrapper')}>
            <Helmet>
                <title>{`${sub_category? sub_category : main_category? main_category : ''} | Project3`}</title>
            </Helmet>
            <div className={cx('container')}>
                <Find type={'category'} params = {{main_category, sub_category}}/>
            </div>
        </div>
    )
}

export default FindCategory;
