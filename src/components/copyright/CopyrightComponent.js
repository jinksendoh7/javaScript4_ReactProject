import { Typography } from '@mui/material';

export default function CopyrightComponet(props, color) {
  return (
    <Typography
      variant="body2"
      color='#000'
      align="center"
      {...props}
    >
      {'Copyright © '}
      www.AdvanatageAutoSales.com
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
