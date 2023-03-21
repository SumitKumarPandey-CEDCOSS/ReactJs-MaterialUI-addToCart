import React, { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Autocomplete from '@mui/material/Autocomplete'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { TextField } from '@mui/material'
import { useHistory } from 'react-router-dom'

export default function Home () {
  const history = useHistory()
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [products, setProducts] = useState([])

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    axios({
      url: 'https://fakestoreapi.com/products/categories',
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        setCategories(response.data)
      } else {
        alert('something went wrong')
      }
    })
  }

  const fetchProducts = category => {
    axios({
      url: `https://fakestoreapi.com/products/category/${category}`,
      method: 'GET'
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        setProducts(response.data)
      } else {
        alert('something went wrong')
      }
    })
  }

  const handleCategoryChange = (event, newValue) => {
    if (newValue) {
      setSelectedCategory(newValue)
      fetchProducts(newValue)
    }
  }

  const viewProduct = id => {
    history.push(`/products/${id}`)
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box
          sx={{
            width: '100%',
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Autocomplete
            options={categories}
            value={selectedCategory}
            sx={{ width: 300 }}
            onChange={handleCategoryChange}
            renderInput={params => (
              <TextField
                {...params}
                label='Select a category'
                variant='outlined'
              />
            )}
          />
        </Box>
        <Grid container spacing={2}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Paper
                sx={{
                  p: 2,
                  margin: 'auto',
                  maxWidth: 400,
                  flexGrow: 1,
                  backgroundColor: theme =>
                    theme.palette.mode === 'dark' ? '#333' : '#f5f5f5'
                }}
                onClick={() => {
                  viewProduct(product.id)
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt='complex' src={product.image} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction='column' spacing={2}>
                      <Grid item xs sx={{ maxHeight: 64, overflow: 'hidden' }}>
                        <Typography
                          gutterBottom
                          variant='subtitle1'
                          component='div'
                        >
                          {product.title}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant='body2'>
                          Price : ${product.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  )
}
