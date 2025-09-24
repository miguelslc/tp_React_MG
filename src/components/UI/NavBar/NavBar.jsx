import { Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import './NavBar.css';
import ProductCard from "../../ProductCard/ProductCard";
import HomeIcon from '@mui/icons-material/Home';

export default function Navbar() {
    return (
        <Grid container className="navbar" alignItems="center" padding={2}>
            <Grid size={5}>
                <div className="nav-brand">
                    <h1>Simple Api</h1>
                </div>
            </Grid>
            <Grid size={5}>
                {/* Navigation Links */}
                <div className="nav-links">
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '10px' }} to="/"><Typography>Home</Typography></Link>
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '10px' }} to="/products"><Typography>Products</Typography></Link>
                    <Link sx={{ textDecoration: 'none', color: 'inherit', padding: '10px' }} to="/users"><Typography>Users</Typography></Link>
                </div>
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