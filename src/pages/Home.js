import React from 'react';
import Container from '@mui/material/Container';
import ListadoAves from '../components/ListadoAves';

const Home = () => (
    <div className='pageHome'>
        <Container>
            <ListadoAves />
        </Container>
    </div>
);

export default Home;
