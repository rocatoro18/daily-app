import { Navigate, Route, Routes } from 'react-router-dom';
import { DailyPage } from '../pages/DailyPage';

export const DailyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DailyPage/>}/>
            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}