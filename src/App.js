import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { publicRoutes } from './routes/routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import BackTop from './components/BackTop/BackTop';
import { AuthProvider } from './context/AuthContext';
import { ParamProvider } from './context/ParamContext';
import NotFound from './pages/NotFound/NotFound';

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <div className="App">
                    <AuthProvider>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                const Layout = route.layout || DefaultLayout;
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <ParamProvider>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </ParamProvider>
                                        }
                                    ></Route>
                                );
                            })}
                        </Routes>
                    </AuthProvider>
                    <BackTop />
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
