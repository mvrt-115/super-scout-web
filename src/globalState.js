import React from 'react'

export const DataContext = React.createContext();

// export function useData() {
//     return React.useContext(DataContext);
// }

// export function DataProvider( {children} ) {

//     const value = [];

//     return (
//         <DataContext.Provider value={value}> 
//             {children}
//         </DataContext.Provider>
//     )
// }