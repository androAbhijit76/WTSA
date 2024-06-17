

// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { productAPI } from '../../../Slice/ProductSlice';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { myproduct } from '../../../Helper/Helper';
// import Box from '@mui/material/Box';

// export default function Products() {
//   const { productData } = useSelector((state) => state.Product);
//   console.log(productData, "productdata");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(productAPI());
//   }, [dispatch]);

//   return (
//     <Box sx={{ marginTop: "8rem", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
//       {Array.isArray(productData.data) && productData.data.map((list, index) => (
//         <Card key={index} sx={{ maxWidth: 345 }}>
//           <CardMedia
//             sx={{ height: 300 }}
//             image={myproduct(list.image)}
//             title={list.title}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {list.title}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {list.description}
//             </Typography>
//           </CardContent>
//           <CardActions>
//             <Button size="small">Delete</Button>
//             <Button size="small">Details</Button>
//           </CardActions>
//         </Card>
//       ))}
//     </Box>
//   );
// }

























import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAPI, productAPI } from '../../../Slice/ProductSlice';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { myproduct } from '../../../Helper/Helper';
// import Box from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

export default function Products() {
  const { productData } = useSelector((state) => state.Product);
  console.log(productData, "productdata");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAPI());
  }, [dispatch]);

  
      const handleDelete=(formData)=>{
    dispatch(deleteAPI(formData)).then(() => dispatch(productAPI(formData)));
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  
  }
  
      const handleRemove=(id)=>{

          const formData = new FormData();
    formData.append("id", id);
  // dispatch(removeAPI(formData)).then(() => dispatch(listAPI(formData)));
  
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
          handleDelete(formData)
          }
        });
  
      }
  

  return (
   <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem"}}>
    {Array.isArray(productData.data) && productData.data?.map((list)=>{
      return(
        <>


<Card style={{ width: '18rem' ,marginTop:"8rem"}}>
      <Card.Img variant="top" src={myproduct(list.image)} />
      <Card.Body>
        <Card.Title>{list.title}</Card.Title>
        <Card.Text>
          {list.description}
        </Card.Text>
        <Button variant="primary" onClick={()=>handleRemove(list._id)} >Delete</Button>
        
        <Link to={`/details/${list._id}`}>
        
        <Button variant="primary" style={{marginLeft:"1rem"}}>Details</Button>
        </Link>
      </Card.Body>
    </Card>
        </>
      )
    }) }

   </div>
  );
}
