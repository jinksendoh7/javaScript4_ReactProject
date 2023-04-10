import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

export default function CopyrightComponet(props, color) {
  return (
    <Typography
      variant="body2"
      color= '#aeabab'
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
