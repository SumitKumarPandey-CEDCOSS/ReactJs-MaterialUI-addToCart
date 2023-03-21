import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Button
} from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Tooltip from '@mui/material/Tooltip'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  media: {
    height: 'auto',
    objectFit: 'contain',
    padding:'10px',
    marginBottom: theme.spacing(2)
  },
  backButton: {
    marginBottom: theme.spacing(2)
  },
  category: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  addButton: {
    marginTop: theme.spacing(2)
  }
}))

export default function Product (props) {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()
  const [product, setProduct] = useState(null)
  const { onClick } = props

  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      )
      if (response.status === 200) {
        setProduct(response.data)
      }
    }
    getProduct()
  }, [id])

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
    const itemIndex = cartItems.findIndex(item => item.id === product.id)
    if (itemIndex === -1) {
      cartItems.push({ ...product, quantity: 1 })
    } else {
      cartItems[itemIndex].quantity += 1
    }
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }

  const renderProductDetails = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tooltip title='Back'>
            <IconButton
              className={classes.backButton}
              onClick={() => history.goBack()}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardMedia
            className={classes.media}
            component='img'
            image={product.image}
            title={product.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {product.title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {product.description}
            </Typography>
            <Typography
              variant='h6'
              color='textSecondary'
              component='p'
              className={classes.category}
            >
              <strong>Category: </strong>
              {product.category}
            </Typography>
            <Typography variant='h6' color='secondary' component='p'>
              <strong style={{ color: 'black' }}>Price : </strong>$
              {product.price}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() => {
                handleAddToCart()
                onClick()
              }}
              className={classes.addButton}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      {product ? (
        <Card className={classes.root}>{renderProductDetails()}</Card>
      ) : (
        <Card
          style={{ height: '100px', textAlign: 'center', padding: '10px' }}
          className={classes.root}
        >
          Product Not Found
        </Card>
      )}
    </div>
  )
}
