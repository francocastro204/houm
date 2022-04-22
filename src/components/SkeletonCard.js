import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const SkeletonCard = () => (
    <Card>
        <Skeleton variant="rectangular" width="100%" height={320} />
        <CardContent className='content-product-list'>
            <Skeleton variant="text" width="70%" height={26} style={{ marginBottom: '8'}} />
            <Skeleton variant="text" width="45%" height={40} style={{ marginBottom: '0' }} />
        </CardContent>
    </Card>
);

export default SkeletonCard;