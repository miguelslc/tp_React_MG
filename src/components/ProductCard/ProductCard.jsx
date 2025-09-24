import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductCard() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://fakestoreapi.com/products');
            console.log(response.data);
            setProducts(response.data || []);
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
                    <Grid>
                        {products.length > 0 ? (
                            <>
                                <Typography variant="h4" sx={{ textAlign: 'center', margin: 2, color: 'primary.main' }}>Product List</Typography>
                                {products.slice(0, 10).map(product => (
                                    <Card key={product.id} sx={{ maxWidth: 345, margin: 2 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={product.image}
                                                alt="green iguana"
                                                sx={{ objectFit: 'contain', padding: 2, backgroundColor: '#f5f5f5' }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {product.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {product.description}...
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 1 }}>
                                                    Category: {product.category}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: 2 }}>
                                                    ${product.price}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: product.rating.rate > 3 ? 'green' : 'red',
                                                    }}
                                                >
                                                    Popularidad: {product.rating.rate > 3 ? "Alta" : "Baja"}
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