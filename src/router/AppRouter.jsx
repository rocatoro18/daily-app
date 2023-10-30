import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DailyRoutes } from '../daily/routes/DailyRoutes';
import { useSelector } from 'react-redux';
import { CheckingAuth } from '../ui';


export const AppRouter = () => {

    const {status} = useSelector(state => state.auth);

    if(status === 'checking'){
        return <CheckingAuth/>
    }

    return (
        <Routes>

            {/* Login y Registro*/}
            <Route path="/auth/*" element={<AuthRoutes/>}/>

            {/* DailyApp */}
            <Route path="/*" element={<DailyRoutes/>}/>

        </Routes>
    )
}