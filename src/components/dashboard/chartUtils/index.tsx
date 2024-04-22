import Box from '@mui/material/Box';
import { TooltipProps } from 'recharts';

type ChartTooltipProps = TooltipProps<number, string> & {
  suffix?: string;
};

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, suffix = '' }) => {
  if (active && payload?.length) {
    return (
      <Box
        sx={{
          fontWeight: 500,
          background: 'rgba(100, 155, 255, 0.3)',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        {`${payload[0]?.value} ${suffix}`}
      </Box>
    );
  }

  return null;
};
