import { Container, Typography } from '@mui/material';

function Header({ heading, subHeading, color='inherit' }) {
  return (
    <Container maxWidth='md' sx={{ my: 4 }}>
      <Typography variant='h4' align='center' gutterBottom color={color}>
        {heading}
      </Typography>
      <Typography variant='body1' align='center' color={color}>
        {subHeading}
      </Typography>
    </Container>
  )
}

export default Header;
