import NewsDetail from "../../components/NewsDetail/NewsDetail";
import Sticky from "../../components/Sticky/Sticky";
import styles from "./ReadNews.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ReadNews(){
     return(
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                {/* <Sticky/> */}
                <NewsDetail />
            </div>
        </div>
     )
}

export default ReadNews;