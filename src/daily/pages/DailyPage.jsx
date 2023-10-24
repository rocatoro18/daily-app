import { IconButton, Typography } from '@mui/material';
import { DailyLayout } from '../layout/DailyLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';


export const DailyPage = () => {
    return (
        <DailyLayout>
            {/*<Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur sed blanditiis quo. Libero ratione totam ullam culpa ea quasi quod dolorem molestiae. Fugiat, id beatae veniam possimus laudantium nesciunt praesentium?</Typography>*/}
            {/* NothingSelected */}
            <NothingSelectedView/>
            {/* NoteView */}
            {/*<NoteView/>*/}

            <IconButton
                size='large'
                sx={{
                    color:'white',
                    backgroundColor:'error.main',
                    ':hover':{backgroundColor:'error.main',opacity:0.9},
                    position:'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{fontSize:30}}/>
            </IconButton>

        </DailyLayout>
    )
}