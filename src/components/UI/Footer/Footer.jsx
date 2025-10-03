import { Grid, Typography, AppBar, Toolbar, Box } from '@mui/material';

export default function Footer() {
    return (
        <Grid container >
            <Grid size={12}>
                <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                    <Toolbar sx={{ backgroundColor: '#333' }}>
                        <Typography>© 2025 Remove any thougs in your head, it´s us or them</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                    </Toolbar>
                </AppBar>
            </Grid>
        </Grid>
    );
}
