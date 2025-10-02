import { Card, CardActionArea, CardContent, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Home(props) {
    const imgCT = "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_ctm_sas_variantf_png.png";
    const imgTT = "https://raw.githubusercontent.com/ByMykel/counter-strike-image-tracker/main/static/panorama/images/econ/characters/customplayer_tm_balkan_varianth_png.png";
    
    const navigate = useNavigate();
    const { setAgent } = props;

    const handleOnclick = (agent) => {
        setAgent(agent);
        navigate('/agents');
    }

    return (
        <>
            <Grid container justifyContent="center" sx={{ minHeight: '10vh' }}>
                <Grid size={12}>
                    <Typography variant="h4" sx={{ textAlign: 'center', margin: 2, color: 'primary.main' }}>Bingo Bango Bongo, Bish Bash Bosh</Typography>
                </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ minHeight: '10vh' }}>
                <Grid size={3}>
                    <Card sx={{ maxWidth: 500, margin: 2 }}>
                        <CardActionArea>
                            <CardContent sx={{ textAlign: 'center', minHeight: 100, minWidth: 450 }}>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                    Anti-Terrotistas
                                </Typography>
                                <Typography
                                    variant="body2"
                                >
                                    <img src={imgCT} alt="Anti-Terroristas" style={{ maxHeight: 400, objectFit: 'contain' }}  onClick={()=> handleOnclick("counter-terrorists")}/>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid size={3} sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <>
                        <Card sx={{ maxWidth: 500, margin: 2 }}>
                            <CardActionArea>
                                <CardContent sx={{ textAlign: 'center', minHeight: 100, minWidth: 450 }}>
                                    <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                        Terroristas
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                    >
                                        <img src={imgTT} alt="Terroristas" style={{ maxHeight: 400, objectFit: 'contain' }}  onClick={()=>handleOnclick("terrorists")}/>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </>
                </Grid>
            </Grid>
        </>
    );
}