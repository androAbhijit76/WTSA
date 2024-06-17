import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { detailsAPI } from '../../../Slice/ProductSlice';
import { Grid,Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { myproduct } from '../../../Helper/Helper';


export default function SingleProduct() {
  const{detailsData}=useSelector((state)=>state.Product)
  console.log(detailsData,"singleProduct");
  const{id}=useParams()
  console.log(id,"product_id");
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(detailsAPI(id))
  },[dispatch,id])
  return (
    <>


<Box marginTop={12}>
        <Grid container sx={{ marginTop: "20px" }} spacing={3}>
          <Grid item md={6} lg={6} sm={6} xs={12}>
            <Card>
              {detailsData  && detailsData?.image && (
                <CardMedia
                  component="img"
                  height="850px"
                  image={myproduct(detailsData?.image)}
                  alt="test image"
                />
              )}
            </Card>
          </Grid>

          <Grid item md={6} lg={6} sm={6} xs={12}>
            <CardContent>
              <Typography variant="h4" textAlign="center" marginBottom={2}>
                Product Detail
              </Typography>
              <hr />
              <Typography variant="h4" textAlign="center">
                {detailsData  && detailsData?.title}
              </Typography>
              <Typography variant="h6" textAlign="center" mt={2}>
                {detailsData  && detailsData?.description}
              </Typography>

              <Link to={`/update/${detailsData._id}`}>
                <Button
                  variant='contained'
                  sx={{ marginLeft: "15rem", width: "6rem", marginTop: "2rem" }}
                >
                  Edit
                </Button>
              </Link>
            </CardContent>
          </Grid>
        </Grid>
      </Box>

         </>
  )
}
