
import { Typography, Box, CircularProgress, Card, CardMedia, Grid, Tooltip, Alert } from '@mui/material';
import useServicesFetch from "../../services";

export default function WeaponSkins(props) {
    const { weapon } = props;
    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/skins.json';
    const { data: serviceData = [], serviceLoading, serviceError } = useServicesFetch(url);

    const filteredSkins = serviceData.filter(skin => {
        const weaponFiltered = skin.name.split(' ').filter(word => word !== '').length > 1;
        const validateWeapon = skin.name.toLowerCase().includes(weapon.toLowerCase());
        return validateWeapon && weaponFiltered;
    });

    if (serviceError) {
        return (
            <Alert variant="filled" severity="error">
                Error: {serviceError}
            </Alert>)

    }

    if (serviceLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <CircularProgress sx={{
                    "--CircularProgress-size": "80px"
                }} />
            </Box>
        );
    }

    if (filteredSkins.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay items para mostrar</Typography>
    }

    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: 2, color: 'primary.main' }}>Skins para {weapon}</Typography>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '10vh' }}>
                <Grid size={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {filteredSkins.map((skin) => (
                        <Card key={skin.id} sx={{ maxWidth: 445, margin: 2 }}>
                            <Tooltip title={skin.name}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={skin.image}
                                    alt={skin.name}
                                    sx={{ objectFit: 'contain', padding: 2, backgroundColor: '#f5f5f5' }}
                                />
                            </Tooltip>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </>
    );
}