import { useState, useContext } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import jwt_decode from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import { images } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { loginService, registerService } from '../../services/authService';

const cx = classNames.bind(styles);

function Login({ setIsLogin, isLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [email1, setEmail1] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [image, setImage] = useState('');
    const [avatar, setAvatar] = useState('');
    const [login, setLogin] = useState(true);
    const [error, setError] = useState('');

    const { user, setUser } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const data = {
            username: email.toLowerCase(),
            password,
        };
        loginUser(data);
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if (email1 && firstName && lastName && password1 && password2) {
            if (password1 !== password2) {
                setError('Các mật khẩu đã nhập không khớp. Hãy thử lại.');
                return;
            }
            const dataForm = new FormData();
            dataForm.append('username', email1);
            dataForm.append('email', email1);
            dataForm.append('password', password1);
            dataForm.append('first_name', firstName);
            dataForm.append('last_name', lastName);
            dataForm.append('profile_pic', image);
            dataForm.append('gender', gender);
            const response = await registerService(dataForm);
            if (response.status === 201) {
                localStorage.setItem('access_token', JSON.stringify(response.data.access));
                localStorage.setItem('AuthToken', JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(jwt_decode(response.data.access).user));
                window.location.reload();
            } else {
                setError('Email đã tồn tại');
            }
        } else {
            setError('Nhập đầy đủ thông tin');
        }
    };

    const loginUser = async (data) => {
        try {
            const response = await loginService(data);

            if (response.status === 200) {
                localStorage.setItem('access_token', JSON.stringify(response.data.access));
                localStorage.setItem('AuthToken', JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(jwt_decode(response.data.access).user));
                window.location.reload();
            } else if (response.status === 400) {
                setError('Tài khoản hoặc mật khẩu không đúng');
            }
        } catch (error) {
            setError('Tài khoản hoặc mật khẩu không đúng');
        }
    };

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setAvatar(reader.result);
                setImage(file);
            };
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')} onClick={() => setIsLogin(!isLogin)}></div>
            <div className={cx('container')}>
                <div className={cx('nav')}>
                    <button className={cx('nav-item', { active: login })} type="button" onClick={() => setLogin(true)}>
                        ĐĂNG NHẬP
                    </button>
                    <button
                        className={cx('nav-item', { active: !login })}
                        type="button"
                        onClick={() => setLogin(false)}
                    >
                        ĐĂNG KÝ
                    </button>
                </div>
                <div className={cx('tab')}>
                    {login ? (
                        <div className={cx('panel')}>
                            <form className={cx('form')} onSubmit={handleSubmit}>
                                <div className={cx('control')}>
                                    <label htmlFor="email" className={cx('label')}>
                                        Email
                                    </label>
                                    <div className={cx('row')}>
                                        <input
                                            className={cx('input')}
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                    </div>
                                </div>
                                <div className={cx('control')}>
                                    <label htmlFor="password" className={cx('label')}>
                                        Password
                                    </label>
                                    <div className={cx('row', 'password')}>
                                        <input
                                            className={cx('input')}
                                            type={!showPassword ? 'password' : 'text'}
                                            name="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                        <button
                                            className={cx('show-password')}
                                            onClick={() => setShowPassword(!showPassword)}
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                    </div>
                                </div>
                                <div className={cx('control')}>
                                    <h5 className={cx('error')} id="error">
                                        {error}
                                    </h5>
                                </div>
                                <div className={cx('control')}>
                                    <button className={cx('button')} type="submit">
                                        ĐĂNG NHẬP
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className={cx('tab')}>
                            <form className={cx('form')} onSubmit={handleSubmitRegister}>
                                <div className={cx('control')}>
                                    <input type="hidden" name="username" value="user" />
                                    <label htmlFor="email1" className={cx('label', 'required')}>
                                        Email
                                    </label>
                                    <div className={cx('row')}>
                                        <input
                                            required
                                            className={cx('input')}
                                            type="email"
                                            name="email1"
                                            placeholder="Email"
                                            autoComplete="email"
                                            value={email1}
                                            onChange={(e) => {
                                                setEmail1(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                    </div>
                                    {/* </div>
                                <div className={cx('control')}> */}
                                    <label htmlFor="password1" className={cx('label', 'required')}>
                                        Password
                                    </label>
                                    <div className={cx('row', 'password')}>
                                        <input
                                            required
                                            className={cx('input')}
                                            type={!showPassword1 ? 'password' : 'text'}
                                            name="password1"
                                            placeholder="Password"
                                            autoComplete="new-password"
                                            value={password1}
                                            onChange={(e) => {
                                                setPassword1(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                        <label htmlFor="password2" className={cx('label', 'required')}>
                                            Re-Password
                                        </label>
                                        <input
                                            required
                                            className={cx('input')}
                                            type={!showPassword1 ? 'password' : 'text'}
                                            name="password2"
                                            placeholder="Re-Password"
                                            autoComplete="new-password"
                                            value={password2}
                                            onChange={(e) => {
                                                setPassword2(e.target.value);
                                                setError('');
                                            }}
                                        ></input>

                                        <button
                                            className={cx('show-password')}
                                            onClick={() => setShowPassword1(!showPassword1)}
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={showPassword1 ? faEyeSlash : faEye} />
                                        </button>
                                        <label htmlFor="firstName" className={cx('label', 'required')}>
                                            First Name
                                        </label>
                                        <input
                                            required
                                            className={cx('input')}
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => {
                                                setFirstName(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                        <label htmlFor="lastName" className={cx('label', 'required')}>
                                            Last Name
                                        </label>
                                        <input
                                            required
                                            className={cx('input')}
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => {
                                                setLastName(e.target.value);
                                                setError('');
                                            }}
                                        ></input>
                                        <label
                                            htmlFor="gender"
                                            className={cx('label')}
                                            style={{ display: 'inline-block', marginRight: '10px' }}
                                        >
                                            Giới tính
                                        </label>
                                        <select
                                            onChange={(e) => setGender(e.target.value)}
                                            value={gender}
                                            name="gender"
                                        >
                                            <option value="" disabled>
                                                Chọn giới tính
                                            </option>
                                            <option value="Nam">Nam</option>
                                            <option value="Nữ">Nữ</option>
                                        </select>
                                        <label htmlFor="avatar" className={cx('label')}>
                                            Avatar
                                        </label>
                                        <input
                                            className={cx('input')}
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleChangeAvatar}
                                        ></input>
                                        <img src={avatar ? avatar : images.blank_img} className={cx('avatar')} />
                                    </div>
                                </div>
                                <div className={cx('control')}>
                                    <h5 className={cx('error')} id="error">
                                        {error}
                                    </h5>
                                </div>
                                <div className={cx('control')}>
                                    <button className={cx('button')} type="submit">
                                        ĐĂNG KÝ
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
