import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DailyRoutes } from '../daily/routes/DailyRoutes';


export const AppRouter = () => {
    return (
        <Routes>

            {/* Login y Registro*/}
            <Route path="/auth/*" element={<AuthRoutes/>}/>

            {/* DailyApp */}
            <Route path="/*" element={<DailyRoutes/>}/>

        </Routes>
    )
}