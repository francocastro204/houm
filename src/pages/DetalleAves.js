import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CircularProgress from '@mui/material/CircularProgress';
import { getAve } from '../services/Services';

const DetalleAves = () => {
    const [loading, setLoading] = useState(true);
    const [detalle, setDetalle] = useState({});
    const { uid } = useParams();

    const getDetalleAve = async () => {
        setLoading(true);
        if (uid) {
            const response = await getAve(uid);
            if (response) {
                setDetalle(response);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getDetalleAve();
    }, []);

    const renderLoading = () => (
        <Card sx={{
            p: 12,
            flex: 1,
            flexGrow: 1,
          }}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Grid>
        </Card>
    );

    const renderContent = () => (
        <Card>
            <CardHeader
                avatar={
                    <Link to="/">
                        <Button variant="contained" startIcon={<KeyboardBackspaceIcon />}>Volver</Button>
                    </Link>
                }
            />
            <Divider />
            <Grid container>
                <Grid item xs={12} md={7} p={3}>
                    {detalle.images.main && (
                        <img
                            src={`${detalle.images.main}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${detalle.images.main}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={detalle.name.spanish}
                            loading="lazy"
                            className="image-maxWith"
                        />
                    )}
                    {detalle.name.spanish && (<h1 className="nunito-700">{detalle.name.spanish}</h1>)}
                    {detalle.didyouknow && (
                        <>
                            <p className="nunito-700 mb-0">Sabías</p>
                            <p className="nunito-300 mt-05">{detalle.didyouknow}</p>
                        </>
                    )}
                    {detalle.habitat && (
                        <>
                            <p className="nunito-700 mb-0">Hábitat</p>
                            <p className="nunito-300 mt-05">{detalle.habitat}</p>
                        </>
                    )}
                    {detalle.order && (
                        <>
                            <p className="nunito-700 mb-0">Tipo</p>
                            <p className="nunito-300 mt-05">{detalle.order}</p>
                        </>
                    )}
                    {detalle.size && (
                        <>
                            <p className="nunito-700 mb-0">Tamaño</p>
                            <p className="nunito-300 mt-05">{detalle.size}</p>
                        </>
                    )}
                    {detalle.species && (
                        <>
                            <p className="nunito-700 mb-0">Especie</p>
                            <p className="nunito-300 mt-05">{detalle.species}</p>
                        </>
                    )}
                    {detalle.images.gallery && (
                        <>
                            <p className="nunito-700 mb-0">Galería de fotos</p>
                            <ImageList sx={{ height: 450 }} variant="quilted" cols={3} rowHeight={164}>
                                {detalle.images.gallery.map((item) => (
                                    <ImageListItem key={item.img}>
                                    <img
                                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={detalle.name.spanish}
                                        loading="lazy"
                                        className="image-maxWith"
                                    />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </>
                    )}
                </Grid>
                <Grid item xs={12} md={5} p={3}>
                    {detalle.map && (
                        <>
                            <p className="nunito-700 mb-0">Ubicación geografica</p>
                            <p className="nunito-300 mt-05">{detalle.map.title}</p>
                            <img
                                src={`${detalle.map.image}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${detalle.map.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={detalle.map.title}
                                loading="lazy"
                                className="image-maxWith"
                            />
                        </>
                    )}
                    {detalle.audio.file && (
                        <>
                            <p className="nunito-700 mb-0">Sonidos</p>
                            <audio src={detalle.audio.file} preload="none" controls></audio>
                        </>
                    )}
                </Grid>
            </Grid>
        </Card>
    );

    return (
        <div>
            <Container>
                {(detalle && !loading) ? renderContent() : renderLoading()}
            </Container>
        </div>
    );
};

export default DetalleAves;