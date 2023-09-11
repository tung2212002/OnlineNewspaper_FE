import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { loginService, logoutService, refreshTokenService, signupService, testService } from '../services/authService';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(
        localStorage.getItem('AuthToken') ? JSON.parse(localStorage.getItem('AuthToken')) : null,
    );
    const [user, setUser] = useState(
        localStorage.getItem('AuthToken') ? jwt_decode(localStorage.getItem('AuthToken')) : null,
    );
    const [loading, setLoading] = useState(true);
    const [showlogin, setShowlogin] = useState(false);
    const loginUser = async (data) => {
        try {
            const response = await loginService(data);

            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(JSON.stringify(jwt_decode(response.data.access).user));
                localStorage.setItem('access_token', JSON.stringify(response.data.access));
                localStorage.setItem('AuthToken', JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(jwt_decode(response.data.access).user));
                document.getElementsByClassName('login')[0].style.display = 'none';
            } else if (response.status === 400) {
                document.getElementById('error').innerHTML = 'Tài khoản hoặc mật khẩu không đúng';
            }
        } catch (error) {
            document.getElementById('error').innerHTML = 'Tài khoản hoặc mật khẩu không đúng';
        }
    };

    const logoutUser = async () => {
        try {
            const data = {
                refresh_token: localStorage.getItem('refresh_token')
                    ? JSON.parse(localStorage.getItem('refresh_token'))
                    : null,
            };

            const response = await logoutService(data);

            if (response.status === 200) {
                setAuthTokens(null);
                setUser(null);
                localStorage.clear();
            }
            else {
                setAuthTokens(null);
                setUser(null);
                localStorage.clear();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateToken = async () => {
        try {
            const data = JSON.stringify({
                refresh: authTokens ? authTokens.refresh : null,
            });
            const response = await refreshTokenService(data);
            if (response.status === 200) {
                setAuthTokens(response.data);
                setUser(jwt_decode(response.data.access).user);

                localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh));
                localStorage.setItem('access_token', JSON.stringify(response.data.access));
                localStorage.setItem('AuthToken', JSON.stringify(response.data));
                localStorage.setItem('user', JSON.stringify(jwt_decode(response.data.access).user));
            } else {
                return;
            }
        } catch (error) {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    };

    const contextData = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        showlogin: showlogin,
        setShowlogin: setShowlogin,
    };
    useEffect(() => {
        if (loading && authTokens) {
            updateToken();
        } else {
            setLoading(false);
            return;
        }

        const time = 50 * 60 * 1000;

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, time);
        return () => clearInterval(interval);
    }, [authTokens, loading]);

    return <AuthContext.Provider value={contextData}>{loading ? null : children}</AuthContext.Provider>;
};
