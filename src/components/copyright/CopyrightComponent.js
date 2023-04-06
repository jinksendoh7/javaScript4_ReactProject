import { Typography } from '@mui/material';
import Link from '@mui/material/Link';

export default function CopyrightComponet(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="www.oneStopAutomotive.com"
      >
        www.oneStopAutomotive.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
