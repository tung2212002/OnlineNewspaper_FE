import { createContext, useState, useEffect } from 'react';

const ParamContext = createContext();

export default ParamContext;

export const ParamProvider = ({ children }) => {
    const [param, setParam] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQ] = useState('');
    const contextData = {
        param,
        setParam,
        loading,
        setLoading,
        q,
        setQ,
    };

    return <ParamContext.Provider value={contextData}>{children}</ParamContext.Provider>;
};
