import React from 'react'
import { Box, Typography } from '@mui/material'

const home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <Typography component='h1' variant='h2'>
        Home Screen
      </Typography>
    </Box>
  )
}

export default home
