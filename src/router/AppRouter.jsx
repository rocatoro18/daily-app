import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DailyRoutes } from '../daily/routes/DailyRoutes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';


export const AppRouter = () => {

    const status = useCheckAuth();
    

    if(status === 'checking'){
        return <CheckingAuth/>
    }

    return (
        <Routes>

            {
                (status === 'authenticated') 
                ? <Route path="/*" element={<DailyRoutes/>}/> 
                : <Route path="/auth/*" element={<AuthRoutes/>}/>
            }

            <Route path='/*' element={<Navigate to = '/auth/login'/>}/>

            {/* Login y Registro*/}
            {/*<Route path="/auth/*" element={<AuthRoutes/>}/>*/}

            {/* DailyApp */}
            {/*<Route path="/*" element={<DailyRoutes/>}/>*/}

        </Routes>
    )
}