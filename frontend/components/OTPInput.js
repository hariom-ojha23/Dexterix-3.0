import React, { useState, useRef, useEffect } from 'react'
import { Stack, TextField } from '@mui/material'

const OTPInput = ({ setOtp }) => {
  const [pinOne, setPinOne] = useState('')
  const [pinTwo, setPinTwo] = useState('')
  const [pinThree, setPinThree] = useState('')
  const [pinFour, setPinFour] = useState('')
  const [pinFive, setPinFive] = useState('')
  const [pinSix, setPinSix] = useState('')

  const pinOneRef = useRef(null)
  const pinTwoRef = useRef(null)
  const pinThreeRef = useRef(null)
  const pinFourRef = useRef(null)
  const pinFiveRef = useRef()
  const pinSixRef = useRef()

  const changeBox = (value, index) => {
    switch (index) {
      case 1:
        setPinOne(value)
        if (value.length === 1) {
          pinTwoRef.current.focus()
        }
        break

      case 2:
        setPinTwo(value)
        if (value.length === 1) {
          pinThreeRef.current.focus()
        }
        break

      case 3:
        setPinThree(value)
        if (value.length === 1) {
          pinFourRef.current.focus()
        }
        break

      case 4:
        setPinFour(value)
        if (value.length === 1) {
          pinFiveRef.current.focus()
        }
        break

      case 5:
        setPinFive(value)
        if (value.length === 1) {
          pinSixRef.current.focus()
        }
        break

      case 6:
        setPinSix(value)
        break
    }
  }

  useEffect(() => {
    const val = pinOne + pinTwo + pinThree + pinFour + pinFive + pinSix
    setOtp(val)
  }, [pinFive, pinOne, pinThree, pinTwo, pinFour, pinSix])

  return (
    <Stack direction='row'>
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinOne}
        inputRef={pinOneRef}
        onChange={(e) => changeBox(e.target.value, 1)}
      />
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinTwo}
        inputRef={pinTwoRef}
        onChange={(e) => changeBox(e.target.value, 2)}
        onKeyDown={(e) => {
          pinTwo.length !== 1 &&
            e.key === 'Backspace' &&
            pinOneRef.current.focus()
        }}
      />
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinThree}
        inputRef={pinThreeRef}
        onChange={(e) => changeBox(e.target.value, 3)}
        onKeyDown={(e) => {
          pinThree.length !== 1 &&
            e.key === 'Backspace' &&
            pinTwoRef.current.focus()
        }}
      />
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinFour}
        inputRef={pinFourRef}
        onChange={(e) => changeBox(e.target.value, 4)}
        onKeyDown={(e) => {
          pinFour.length !== 1 &&
            e.key === 'Backspace' &&
            pinThreeRef.current.focus()
        }}
      />
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinFive}
        inputRef={pinFiveRef}
        onChange={(e) => changeBox(e.target.value, 5)}
        onKeyDown={(e) => {
          pinFive.length !== 1 &&
            e.key === 'Backspace' &&
            pinFourRef.current.focus()
        }}
      />
      <TextField
        autoFocus
        inputProps={{
          maxLength: 1,
          style: {
            textAlign: 'center',
          },
        }}
        sx={{ mx: 0.5 }}
        value={pinSix}
        inputRef={pinSixRef}
        onChange={(e) => changeBox(e.target.value, 6)}
        onKeyDown={(e) => {
          pinSix.length !== 1 &&
            e.key === 'Backspace' &&
            pinFiveRef.current.focus()
        }}
      />
    </Stack>
  )
}

export default OTPInput
