import styles from './HeaderTop.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { images, footerBottomIcon, itemsTopHeader } from '../../../assets';
import { getWeatherService } from '../../../services/weatherService';
import BoxWeather from '../BoxWeather/BoxWeather';

const cx = classNames.bind(styles);

function HeaderTop() {
    const [timeNow, setTimeNow] = useState('');
    const [city, setCity] = useState('Hà Nội');
    const [weather, setWeather] = useState('');
    const [isShow, setIsShow] = useState(false);

    const getTime = () => {
        const datetimenow = new Date();
        const date = datetimenow.getDate();
        const month = datetimenow.getMonth() + 1;
        const year = datetimenow.getFullYear();
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = daysOfWeek[datetimenow.getDay()];
        return dayName + ', ' + date + '/' + month + '/' + year;
    };

    const getWeather = async (city) => {
        const params = {
            q: city,
        };
        try {
            setWeather('...');

            // const response = await getWeatherService(params);
            // setWeather(Math.round(response.main.temp-273.15));
        } catch (err) {
            setWeather('...');
        }
    };

    const handleShow = () => {
        setIsShow(!isShow);
    };

    useEffect(() => {
        setTimeNow(getTime());
    }, []);

    useEffect(() => {
        getWeather(city);
    }, [city]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('list')}>
                    <div className={cx('items')}>
                        <div>
                            <span className={cx('text')}>{timeNow}</span>
                        </div>
                    </div>
                    <div className={cx('items')}>
                        <div className={cx('weather', 'list-weather')} onClick={handleShow}>
                            <span className={cx('text')}>{city}</span>
                            <span className={cx('icon-down')}>
                                <img src={images.down.default} alt="icon-down" />
                            </span>
                            <span className={cx('text')}>{weather}°C</span>
                            <span className={cx('icon-weather')}>
                                <img src={images.weather} alt="icon-weather" />
                            </span>
                            {isShow && <BoxWeather setCity={setCity} setIsShow={setIsShow} />}
                        </div>
                        <div className={cx('items-right')}>
                            {itemsTopHeader.map((item, index) => {
                                return (
                                    <a className={cx('item')} key={index} href={item.url}>
                                        {item.nameItem}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className={cx('social')}>
                    <span className={cx('text')}>Theo dõi báo trên</span>
                    <div className={cx('items')}>
                        {footerBottomIcon.map((item, index) => {
                            return (
                                <a className={cx('item')} key={index} href={item.url}>
                                    <img src={item.icon.default} alt={item.alt} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderTop;
