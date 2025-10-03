import { BarChart } from '@mui/x-charts/BarChart';
import { CircularProgress, Box, Typography } from '@mui/material';
import useServicesFetch from "../services";

export default function SkinsCharts() {

    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/skins.json';
    const { data: serviceData = [], serviceLoading, serviceError } = useServicesFetch(url);

    function contarSkinsAgrupadas(serviceData) {
        return serviceData.reduce((conteo, skin) => {
            const weaponParts = skin.name.split(' | ');
            const weaponName = weaponParts[0] ? weaponParts[0].trim() : null;
            if (weaponName) {
                conteo[weaponName] = (conteo[weaponName] || 0) + 1;
            }

            return conteo;
        }, {});
    }

    const conteoPorArma = contarSkinsAgrupadas(serviceData);

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
        )
    }

    return (
        <>
            <BarChart
                width={800}
                height={600}
                series={[{ data: Object.values(conteoPorArma), label: "Cantidad", type: 'bar' }]}
                xAxis={[{ scaleType: 'band', data: Object.keys(conteoPorArma) }]}
            />
            <Typography variant="h6" sx={{ textAlign: 'center', color: "#3b3b3b", padding: "15px" }}>Cantidad de Skins por Armamento</Typography>
        </>

    );
}