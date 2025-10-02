import { Card, CardMedia, Grid, LinearProgress, Box, Button } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useServicesFetch from "../services";
import { Outlet, useNavigate } from "react-router-dom";

export default function Weapons(props) {

    const navigate = useNavigate();
    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/base_weapons.json';
    const { data: serviceData, loading: serviceLoading, error: serviceError } = useServicesFetch(url);

    const { setWeapon } = props;

    const onHandleClick = (weapon) => {
        setWeapon(weapon);
        console.log(weapon);
        navigate(`/weapons/skins`);
    }

    if (serviceError) {
        return <div>Error: {serviceError}</div>;
    }

    if (serviceLoading) {
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
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

// weapons item : id: "base_weapon-weapon_mag7" -> Object { id: "base_weapon-weapon_scar20", name: "SCAR-20", description: "El SCAR-20 es un rifle de francotirador semiautomático que ofrece una alta cadencia de disparo y un potente daño a larga distancia a cambio de una velocidad de movimiento lenta y un precio elevado.", … }​​​
// description: "El SCAR-20 es un rifle de francotirador semiautomático que ofrece una alta cadencia de disparo y un potente daño a larga distancia a cambio de una velocidad de movimiento lenta y un precio elevado."
// ​​​
// id: "base_weapon-weapon_scar20"
// ​​​
// image: "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/weapons/base_weapons/weapon_scar20_png.png"
// ​​​
// name: "SCAR-20"


// weapon skins -> weapon: Object { id: "weapon_m249", weapon_id: 14, name: "M249" }
// ​​​​id: "weapon_m249"
// ​​​​name: "M249"
// ​​​​weapon_id: 14

<Accordion>
    <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
    >
        <Typography component="span">Accordion 2</Typography>
    </AccordionSummary>
    <AccordionDetails>
        <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
    </AccordionDetails>
</Accordion>