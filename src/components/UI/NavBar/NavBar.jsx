import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import './NavBar.css';
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
    return (
        <Grid container className="navbar" alignItems="center" padding={2}>
            <Grid size={5}>
                    <h1>Simple Api</h1>
            </Grid>
            <Grid size={5} className="nav-links" sx={{ display: 'flex', justifyContent: 'left' }}>
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '5px' }} to="/"><Typography>Home</Typography></Link>
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '5px' }} to="/weapons"><Typography>Weapons</Typography></Link>
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '5px' }} to="/charts"><Typography>Charts</Typography></Link>
            </Grid>
            <Grid size={2} sx={{ textAlign: 'right' }}>
                <Link to="/">
                    <IconButton color="inherit">
                        <HomeIcon />
                    </IconButton>
                </Link>
            </Grid>
        </Grid>
    );
}