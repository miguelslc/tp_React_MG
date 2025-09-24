import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserCard() {
    const [users, setUsers] = useState([]);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/users');
            console.log(response.data);
            setUsers(response.data || []);
        } catch (error) {

            console.error("Error al obtener los usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowMore = (id) => {
        setShowMore(!showMore);
        (!showMore) ? fetchDetail(id) : setUserDetails(null);
    };

    const fetchDetail = async (id) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/users/${id}`);
            setUserDetails(response.data || null);
            console.log(response.data);
        } catch (error) {
            console.error("Error al obtener los detalles del usuario:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '10vh' }}>
                <Grid>
                    {users.length > 0 ? (
                        <>
                            <Typography variant="h4" sx={{ textAlign: 'center', margin: 2, color: 'primary.main' }}>User List</Typography>
                            {users.slice(0, 10).map(user => (
                                <Card key={user.id} sx={{ maxWidth: 345, margin: 2 }}>
                                    <CardActionArea onClick={() => handleShowMore(user.id)}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={user.image}
                                            alt="User Image"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {user.name.firstname} {user.name.lastname}
                                            </Typography>
                                            {showMore && userDetails && userDetails.id === user.id && (
                                                <div>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {userDetails.email}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {userDetails.phone}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {userDetails.address.city}, {userDetails.address.street}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                        {userDetails.description}
                                                    </Typography>
                                                </div>
                                            )}
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No products found</Typography>
                    )}
                </Grid>
            </Grid >
        </>
    );
}