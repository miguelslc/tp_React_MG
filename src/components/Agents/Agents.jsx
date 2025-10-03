import { Card, CardMedia, Typography, Grid, CircularProgress, Box, Alert, ImageList, ImageListItem } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useServicesFetch from "../services";
export default function Agents(props) {

    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/agents.json';

    const { data: serviceData = [], loading: serviceLoading, error: serviceError } = useServicesFetch(url);
    const agents = serviceData.filter(agent => agent.team.id === props.agent);

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

    if (agents.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay agentes para mostrar</Typography>
    }

    return (
        <>

            <Grid container justifyContent="center" sx={{ minHeight: '10vh' }}>
                <Grid size={12} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <>
                        <ImageList cols={4} >
                            {agents.map((agent) => (
                                <ImageListItem key={agent.id}>
                                    <Card key={agent.id} sx={{ maxWidth: 600, margin: 1 }}>
                                        <CardMedia
                                            component="img"
                                            height="320"
                                            image={agent.image}
                                            alt="Agent CS:GO"
                                            sx={{ objectFit: 'contain', padding: 2, backgroundColor: '#f5f5f5' }}
                                        />
                                        <Accordion>
                                            <AccordionSummary
                                                sx={{ minHeight: '95px' }}
                                                expandIcon={<ArrowDropDownIcon />}
                                                aria-controls={"base_weapon-weapon"}
                                                id={agent.id}
                                            >
                                                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                                    {agent.name}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {agent.description}
                                                </Typography>
                                                <Typography>
                                                    {agent.team.name}
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>

                                    </Card>
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </>
                </Grid>
            </Grid>
        </>
    );
}