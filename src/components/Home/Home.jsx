import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            console.log(response.data);
            setTodos(response.data || []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching products data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '10vh' }}>
                    <Grid item xs={12}>
                        {todos.length > 0 ? (
                            <>
                                <Typography variant="h4" sx={{ textAlign: 'center', margin: 2, color: 'primary.main' }}>TODO List</Typography>
                                {todos.slice(0, 10).map(todo => (
                                    <Card key={todo.id} sx={{ maxWidth: 345, margin: 2 }}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                                                    {todo.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: todo.completed ? 'primary.main' : 'red',
                                                    }}
                                                >
                                                    {todo.completed ? "Realizado" : "No Realizado"}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </>
                        ) : (
                            <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>No products found</Typography>
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
}