import { IconButton, Typography } from '@mui/material';
import { DailyLayout } from '../layout/DailyLayout';
import { NoteView, NothingSelectedView } from '../views';
import { AddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/daily/thunks';


export const DailyPage = () => {

    const dispatch = useDispatch();
    const {isSaving, active} = useSelector(state => state.daily);

    //console.log(isSaving);

    const onClickNewNote = () => {
        dispatch(startNewNote());
    }

    return (
        <DailyLayout>
            {/*<Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur sed blanditiis quo. Libero ratione totam ullam culpa ea quasi quod dolorem molestiae. Fugiat, id beatae veniam possimus laudantium nesciunt praesentium?</Typography>*/}
            {/* NothingSelected */}
            {
                // !! DE ESTA FORMA SE CONVIERTE EN BOOLEAN
                (!!active) ? <NoteView/> : <NothingSelectedView/>
            }
            {/*<NothingSelectedView/>*/}
            {/* NoteView */}
            {/*<NoteView/>*/}

            <IconButton
                onClick={onClickNewNote}
                disabled={isSaving}
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