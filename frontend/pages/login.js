import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/Image'
import {
  Box,
  Typography,
  Stack,
  Paper,
  FormLabel,
  Button,
  TextField,
} from '@mui/material'
import OTPInput from '../components/OTPInput'
import SnackBar from '../components/SnackBar'

import { auth } from '../Firebase/config'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { API_SERVICE } from '../config'
import axios from 'axios'

const Login = () => {
  const [otp, setOtp] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirmObj, setConfirmObj] = useState('')
  const [flag, setFlag] = useState(false)

  const [message, setMessage] = useState('')
  const [variant, setVariant] = useState('success')
  const [snackOpen, setSnackOpen] = useState(false)

  const route = useRouter()

  const addUserToDB = async (number) => {
    const config = {
      headers: {
        'Content/Type': 'application/json',
      },
    }

    const body = {
      contact: number,
    }

    axios
      .post(`${API_SERVICE}/user/login`, body, config)
      .then((res) => {
        console.log(res.data)
        if (!res.data.success) {
          setMessage(res.data.message)
          setVariant('error')
          setSnackOpen(true)
          return
        }

        const user = res.data.user
        window.sessionStorage.setItem('userData', JSON.stringify(user))
        route.push('/home')
      })
      .catch()
  }

  const setUpReacptcha = (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    )

    recaptchaVerifier.render()

    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  const getOTP = async () => {
    if (phoneNumber.length !== 10) {
      setMessage('10 digit phone number is required')
      setVariant('error')
      setSnackOpen(true)
    } else {
      try {
        const response = await setUpReacptcha(`+91${phoneNumber}`)
        console.log(response)
        setFlag(true)
        setConfirmObj(response)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const verifyOTP = async () => {
    if (!flag) {
      setMessage('First Enter Phone Number and get OTP')
      setVariant('error')
      setSnackOpen(true)
    } else if (otp.length === 0) {
      setMessage('6 digit OTP is required')
      setVariant('error')
      setSnackOpen(true)
    } else {
      try {
        await confirmObj
          .confirm(otp)
          .then((result) => {
            const user = result.user
            console.log(user.auth.currentUser.phoneNumber.slice(3))
            addUserToDB(user.auth.currentUser.phoneNumber.slice(3))
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const snackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackOpen(false)
  }

  return (
    <Box
      sx={{
        width: '100w',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>healthNcare / Sign In</title>
        <meta name='description' content='Health and Care' />
        <link rel='icon' href='/logo.png' />
      </Head>

      <Paper sx={{ height: '70%', width: '60%', boxShadow: 8 }}>
        <Stack direction='row' sx={{ width: '100%', height: '100%' }}>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              backgroundColor: '#76BCEF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src='/logo.png' alt='logo' width={600} height={600} />
          </Box>
          <Box
            sx={{
              width: '50%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              px: 10,
            }}
          >
            <Typography
              component='h3'
              variant='h3'
              color='#76BCEF'
              fontWeight='600'
              sx={{ my: 5 }}
            >
              Sign In
            </Typography>

            {/* Phone Number Part */}
            <FormLabel sx={{ my: 1 }}>Enter Phone Number</FormLabel>
            <TextField
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button
              sx={{
                alignSelf: 'flex-end',
                my: 1,
                letterSpacing: 1,
                p: 0,
                color: '#E83E3E',
                fontWeight: 'bold',
              }}
              onClick={() => getOTP()}
            >
              Send OTP
            </Button>

            <div id='recaptcha-container' />

            {/* OTP Part */}
            <FormLabel sx={{ my: 1 }}>Enter OTP</FormLabel>
            <OTPInput setOtp={setOtp} />

            <Button
              variant='contained'
              sx={{
                py: 1.5,
                textTransform: 'capitalize',
                fontSize: 22,
                backgroundColor: '#76BCEF',
                letterSpacing: 1.4,
                my: 4,
              }}
              onClick={() => verifyOTP()}
            >
              Verify OTP
            </Button>
          </Box>
        </Stack>
      </Paper>

      <SnackBar
        snackOpen={snackOpen}
        snackClose={snackClose}
        variant={variant}
        message={message}
      />
    </Box>
  )
}

export default Login
