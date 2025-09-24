
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <Typography variant="h3" sx={{ textAlign: 'center', margin: 2, color: 'red' }}>404 - Página No Encontrada</Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', margin: 2, color: 'text.secondary' }}>La página que buscas no existe.</Typography>
            <Button variant="contained" sx={{ display: 'block', margin: '0 auto', padding: 2 }} onClick={() => navigate('/')}>Ir a Inicio</Button>
        </>
    );

};