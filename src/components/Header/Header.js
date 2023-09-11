import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderCenter from "./HeaderCenter/HeaderCenter";
import HeaderBottom from "./HeaderBottom/HeaderBottom";

const cx = classNames.bind(styles);

function Header(){
    return (
        <div className={cx("wrapper")}>
            <HeaderTop />
            <HeaderCenter />
            <HeaderBottom />
        </div>
    )
}

export default Header;