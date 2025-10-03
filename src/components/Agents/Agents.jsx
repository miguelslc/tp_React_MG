import { Card, CardMedia, Typography, Grid, LinearProgress, Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useServicesFetch from "../services";
import { useEffect, useState } from "react";

export default function Agents(props) {

    const url = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/es-ES/agents.json';

    const { data: serviceData = [], loading: serviceLoading, error: serviceError } = useServicesFetch(url);
    const agents = serviceData.filter(agent => agent.team.id === props.agent);

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

    if (agents.length === 0) {
        return <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No hay agentes para mostrar</Typography>
    }

    return (
        <>
            <Grid container justifyContent="center" sx={{ minHeight: '10vh' }}>
                <Grid size={4} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <>
                        {agents.map((agent) => (
                            <Card key={agent.id} sx={{ maxWidth: 400, margin: 2 }}>
                                <CardMedia
                                    component="img"
                                    height="250"
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
                        ))}
                    </>
                </Grid>
            </Grid>
        </>
    );
}