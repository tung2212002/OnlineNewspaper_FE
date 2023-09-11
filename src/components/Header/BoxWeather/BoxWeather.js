import styles from './BoxWeather.module.scss';
import classNames from 'classnames/bind';
import { useRef, useEffect } from 'react';

const cx = classNames.bind(styles);

function BoxWeather({ setCity, setIsShow }) {
    const boxRef = useRef(null);

    const cityList = [
        'An Giang',
        'Bình Dương',
        'Bình Phước',
        'Bình Thuận',
        'Bình Định',
        'Bạc Liêu',
        'Bắc Giang',
        'Bắc Kạn',
        'Bắc Ninh',
        'Bến Tre',
        'Cao Bằng',
        'Cà Mau',
        'Cần Thơ',
        'Điện Biên',
        'Đà Nẵng',
        'Đà Lạt',
        'Đắk Lắk',
        'Đắk Nông',
        'Đồng Nai',
        'Đồng Tháp',
        'Gia Lai',
        'Hà Nội',
        'Hồ Chí Minh',
        'Hà Giang',
        'Hà Nam',
        'Hà Tĩnh',
        'Hòa Bình',
        'Hưng Yên',
        'Hải Dương',
        'Hải Phòng',
        'Hậu Giang',
        'Khánh Hòa',
        'Kiên Giang',
        'Kon Tum',
        'Lai Châu',
        'Long An',
        'Lào Cai',
        'Lâm Đồng',
        'Lạng Sơn',
        'Nam Định',
        'Nghệ An',
        'Ninh Bình',
        'Ninh Thuận',
        'Phú Thọ',
        'Phú Yên',
        'Quảng Bình',
        'Quảng Nam',
        'Quảng Ngãi',
        'Quảng Ninh',
        'Quảng Trị',
        'Sóc Trăng',
        'Sơn La',
        'Thanh Hóa',
        'Thái Bình',
        'Thái Nguyên',
        'Thừa Thiên Huế',
        'Tiền Giang',
        'Trà Vinh',
        'Tuyên Quang',
        'Tây Ninh',
        'Vĩnh Long',
        'Vĩnh Phúc',
        'Vũng Tàu',
        'Yên Bái',
    ];

    return (
        <div className={cx('wrapper')} ref={boxRef}>
            <ul>
                {cityList.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={cx('item')}
                            value={item}
                            onClick={() => {
                                setCity(item);
                                setIsShow(false);
                            }}
                        >
                            <div className={cx('label')}>{item}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default BoxWeather;
