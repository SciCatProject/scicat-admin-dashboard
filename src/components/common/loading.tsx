import { Box, Card, CircularProgress } from '@mui/material';

type LoadingSpinnerProps = {
  card?: boolean;
};
export const LoadingSpinner = ({ card }: LoadingSpinnerProps) => {
  switch (card) {
    case true:
      return (
        <Card
          sx={{ minHeight: '8vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <CircularProgress />
        </Card>
      );
    default:
      return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{ minHeight: '8vw' }}>
          <CircularProgress />
        </Box>
      );
  }
};
