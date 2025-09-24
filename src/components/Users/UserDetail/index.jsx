// import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@mui/material";
// import { useState } from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

export default function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const fetchUserDetail = async (id) => {
        try {
            const response = await axios.get(`https://fakestoreapi.com/users/${id}`);
            console.log(response.data);
            setUser(response.data || null);
        } catch (error) {
            console.error("Error fetching user detail:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetail(id);
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (<>
        {user ? (<Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            {user.name.firstname} {user.name.lastname} - {user.email} - {user.phone} - {user.address.city}, {user.address.street}
        </Typography>
        ) : (<div>No User Selected</div>)}
    </>);
}