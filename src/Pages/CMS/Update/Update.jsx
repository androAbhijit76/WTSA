import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Typography,Container, TextField ,Button} from '@mui/material';
import { useForm } from 'react-hook-form';
import { detailsAPI, redirectionTo, updateAPI } from '../../../Slice/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { myproduct } from '../../../Helper/Helper';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme();


export default function Update() {
  const{detailsData,status,redirectTo}=useSelector((state)=>state.Product)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [image,setImage]=useState()
  // const[form,setForm]=useState({})
  const {id}=useParams()
  console.log(id,"updateid");

 

  useEffect(()=>{
     dispatch(detailsAPI(id))
  },[])

  useEffect(()=>{
    navigate(redirectTo)
    dispatch(redirectionTo(null))
  },[dispatch,redirectTo,redirectionTo])

 

  const{register,formState:{errors},setValue,reset,handleSubmit}=useForm()

  useEffect(()=>{

    if (detailsData) {
      setValue("title",detailsData?.title)
    setValue("description", detailsData?.description)
    setValue("image" , detailsData?.image)
    }
    
  },[setValue,detailsData])

  const onSubmit=(data)=>{
      const  formdata=new FormData()
      formdata.append("id",id) 
      formdata.append("title",data.title)
      formdata.append("description",data.description)
      formdata.append("image",data.image[0])
      
       dispatch(updateAPI(formdata))
  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container maxWidth="xs" component="main">
<CssBaseline/>
<Box  sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
  <Typography variant='h4'>
         Update
  </Typography>
  <Box noValidate sx={{ mt: 3 }} component="form"   onSubmit={handleSubmit(onSubmit)}>
    <TextField  
    {...register("title",{required:true})} 
    required
    fullWidth
    error={errors.title}
    autoFocus
    helperText={errors.title && "Title is required"}
    label='Title'
    // defaultValue={form?.title || ""}
    
    />
    <TextField  
    {...register("description",{required:true})}
    required
    fullWidth
    autoFocus
    error={errors.description}
    helperText={errors.description && "Description is required"}
    label='Description'
    
    />

    <TextField   
     {...register("image",{required:true,maxLength:20})}
     required
     type='file'
     error={!image && errors.image}
     helperText={!image && errors.image && "Image is required"}
     onChange={(e)=>setImage(e.target.files[0])}
     fullWidth
    
    
    />
   
                {image !== "" && image !== null && image !== undefined ? (
  <>
    <img src={URL.createObjectURL(image)} alt="" style={{height:"200px"}}/>
  </>
) : (
  <>
    <img src={myproduct(detailsData?.image)} alt="" style={{height:"200px"}}/>
  </>
)}

   {
    status==='idle' ? (
      <Button fullWidth type='submit' variant='contained'>Submit</Button>
    )   :(
      <Button fullWidth type='submit' variant='contained'>Loading...</Button>
    )
   }

  </Box>
</Box>
        </Container>
       

      </ThemeProvider>
    </>
  )
}
