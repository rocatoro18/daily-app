import { Typography } from '@mui/material';
import { DailyLayout } from '../layout/DailyLayout';
import { NoteView, NothingSelectedView } from '../views';


export const DailyPage = () => {
    return (
        <DailyLayout>
            {/*<Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur sed blanditiis quo. Libero ratione totam ullam culpa ea quasi quod dolorem molestiae. Fugiat, id beatae veniam possimus laudantium nesciunt praesentium?</Typography>*/}
            {/* NothingSelected */}
            {/*<NothingSelectedView/>*/}
            {/* NoteView */}
            <NoteView/>
        </DailyLayout>
    )
}