import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useGetIdentity } from '@refinedev/core';
import { HamburgerMenu, RefineThemedLayoutV2HeaderProps } from '@refinedev/mui';
import React, { useContext } from 'react';
import { ColorModeContext } from '../../contexts/color-mode';

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({ sticky = true }) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity<IUser>();

  return (
    <AppBar position={sticky ? 'sticky' : 'relative'}>
      <Toolbar>
        <Stack direction='row' width='100%' justifyContent='flex-end' alignItems='center'>
          <HamburgerMenu />
          <Stack direction='row' width='100%' justifyContent='flex-end' alignItems='center'>
            {user?.name && (
              <Stack
                direction='row'
                gap='16px'
                alignItems='center'
                justifyContent='center'
                useFlexGap
              >
                {user?.name && <Typography variant='subtitle1'>{user?.name}</Typography>}
              </Stack>
            )}
            <IconButton
              color='inherit'
              onClick={() => {
                setMode();
              }}
            >
              {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>
            <Typography
              sx={{
                bgcolor: 'primary.dark',
                color: 'primary.light',
                borderRadius: '10px',
                px: 1,
                py: 0.1,
                opacity: 0.8,
              }}
            >
              v0.0.1
            </Typography>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
