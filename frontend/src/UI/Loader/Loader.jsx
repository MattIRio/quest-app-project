import { CircularProgress } from '@mui/material'
import React from 'react'

export default function Loader() {
   return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
         <CircularProgress color='black' />
      </div>
   )
}
