import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function HorizontalCardElement({data}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', border:1, borderColor: '#e3e3e3'}} elevation={0}>
    <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={data.imageUrl}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        </CardContent>
       </Box>
    </Card>
  );
}