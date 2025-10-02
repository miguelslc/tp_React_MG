import { Grid, Typography } from '@mui/material';

export default function Footer() {
    return (
        <Grid container >
            <Grid sx={{ textAlign: 'center', backgroundColor: '#333', color: 'white'}} size={12}>
                <Typography>© 2025 Simple Api Store</Typography>
            </Grid>
        </Grid>
    );
}
