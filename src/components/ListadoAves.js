import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { getAves } from '../services/Services';
import SkeletonCard from './SkeletonCard';

const ListadoAves = () => {
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [listadoAves, setListadoAves] = useState([]);
    const [listadoAvesCustom, setListadoAvesCustom] = useState([]);
    const skeletonNumberItems = 12;

    let navigate = useNavigate();

    const listaAves = async () => {
        setLoading(true);
        const resp = await getAves();
        if (resp && resp.length) {
            setLoading(false);
            setListadoAves(resp);
            setListadoAvesCustom(resp);
        };
        setLoading(false);
    }

    useEffect(() => {
        listaAves();
    }, []);

    const renderLoading = () => (
        <>
            {Array(...Array(skeletonNumberItems)).map((index) => (
                <Grid item xs={12} sm={4} md={3} key={index}>
                    <SkeletonCard />
                </Grid>
            ))}
        </>
    );

    const goToDetalleAve = (id) => {
        return navigate(`/aves/${id}`);
    };

    const handleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = ( terminoBusqueda ) => {
        const resultadosBusqueda = listadoAves.filter((elemento) => {
            if (elemento.name.spanish.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elemento;
            }
        });
        setListadoAvesCustom(resultadosBusqueda);
    }

    const renderItem = () => (
        <>
            {listadoAvesCustom.map((item, index) => {
                if (item) {
                    return (
                        <Grid item xs={12} sm={4} md={3} key={index}>
                            <Card className='card-product-list'>
                                <Button className='card-action-product-list' onClick={() => goToDetalleAve(item.uid)}>
                                    <img
                                        src={item.images.full}
                                        alt={item.name.spanish}
                                        loading="lazy"
                                        className="image-maxWith image-product-list"
                                    />
                                </Button>
                                <CardContent className='cardContent-product-list'>
                                    <h3 className="title-product-list nunito-400 mt-0">{item.name.spanish}</h3>
                                    <Button size="small" className="nunito-300" onClick={() => goToDetalleAve(item.uid)}>Saber más</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                }
                return null
            })}
        </>
    );

    const renderFiltros = () => {
        return (
            <Box>
                <AppBar position="static" sx={{ bgcolor: '#263238', borderRadius: 4, marginBottom: 2, padding: 1 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                        <Grid item xs={7} >
                            <Search>
                                <SearchIconWrapper>
                                <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    inputProps={{ 'aria-label': 'search'}}
                                    defaultValue={busqueda}
                                    placeholder="Buscar"
                                    onChange={handleChange}
                                />
                            </Search>
                        </Grid>
                    </Grid>
                </AppBar>
            </Box>
        );
    }

    return (
        <>
            <Box>
                <Grid>
                    {renderFiltros()}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={{ xs: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {listadoAvesCustom && listadoAvesCustom.length && !loading ? renderItem() : renderLoading()}
                </Grid>
            </Box>
        </>
    );
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
    },
}));

export default ListadoAves;
