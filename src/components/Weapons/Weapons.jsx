import { Card, CardMedia, Grid, LinearProgress, Box, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useServicesFetch from "../services";
import {useNavigate } from "react-router-dom";

export default function Weapons(props) {

    const navigate = useNavigate();
    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/base_weapons.json';
    const { data: serviceData = [], loading: serviceLoading, error: serviceError } = useServicesFetch(url);

    const { setWeapon } = props;

    const onHandleClick = (weapon) => {
        setWeapon(weapon);
        navigate(`/weapons/skins`);
    }

    if (serviceError) {
        return <div>Error: {serviceError}</div>;
    }

    if (serviceLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    if (serviceData.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay productos para mostrar</Typography>
    }

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '10vh' }}>
                <Grid size={6} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <>
                        {serviceData.slice(2).map((weapon) => (
                            <Card key={weapon.id} sx={{ maxWidth: 445, margin: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={weapon.image}
                                    alt="weapon CS:GO"
                                    sx={{ objectFit: 'contain', padding: 2, backgroundColor: '#f5f5f5' }}
                                />
                                <Accordion>
                                    <AccordionSummary
                                        sx={{ minHeight: '95px' }}
                                        expandIcon={<ArrowDropDownIcon />}
                                        aria-controls={"base_weapon-weapon"}
                                        id={weapon.id}
                                    >
                                        <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                            {weapon.name || weapon.title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {weapon.description}
                                        </Typography>
                                        <Button variant="contained" onClick={() => onHandleClick(weapon.name)} sx={{ marginTop: 2 }} > Ver Skins </Button>
                                    </AccordionDetails>
                                </Accordion>
                            </Card>
                        ))}
                    </>
                </Grid>
            </Grid>
        </>
    );
}