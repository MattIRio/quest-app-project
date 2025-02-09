import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function GoBackButton() {
   const navigate = useNavigate()
   return (
      <Button
         variant="contained" // Стиль кнопки
         sx={{ mb: 3, width: 100, bgcolor: "purple" }}
         onClick={() => navigate(-1)}
      >
         Go back
      </Button>
   )
}
