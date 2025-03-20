import React, { createContext, useState } from 'react';


export const SiteConfigContext = createContext<Record<string, any>>({});

export default function SiteConfigProvider ({children}) {
    const [data, setData] = useState();

    return (
        <SiteConfigContext.Provider value={{
            data
        }}>
            {children}
        </SiteConfigContext.Provider>
    )
};