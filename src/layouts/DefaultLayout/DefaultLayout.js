import styles from "./DefaultLayout.module.scss"
import classNames from "classnames/bind";
import Header from "../../components/Header/Header";

const cx = classNames.bind(styles)

function DefaultLayout(){
    return(
        <div className={cx("wrapper")}>
            <Header/>
            <div className={cx("container")}>
                <div className={cx("content")}>
                    <h2>Content</h2>
                </div>
            </div>
        </div>
    )
}

export default DefaultLayout;