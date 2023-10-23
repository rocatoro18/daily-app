import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const DailyApp = () => {
    return (
        <>
        {/* Sistema de rutas principal de la app */}
            <AppTheme>
                <AppRouter/>
            </AppTheme>
        </>
    )
}