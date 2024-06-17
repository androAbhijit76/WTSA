import { Drawer, IconButton,List,  ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React,{useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import Create from './../Pages/CMS/Create/Create';


function DrawerComp() {
    const[open,setOpen]=useState(false)
    const handleClose=()=>{
        setOpen(false)
    }

    const handleOpen=()=>{
        setOpen(!open)
    }
  return (
    <>
    <Drawer PaperProps={{sx:{backgroundColor:"skyBlue"}}} open={open} onClose={handleClose}>
    <List>
      


<ListItemButton  onClick={handleClose} >
            <ListItemIcon>
                
                <ul className='mobile-navigation'>
                    <h4>
                    <Link to={"/"}>User/Dashboard</Link>
                    </h4>
                  
                    <h4>
                        <Link to={"/products"}>Products</Link>
                    </h4>
                    <h4>
                        <Link to={"/create"}>Create</Link>
                    </h4>
                    <h4>
                        <Link to={"/login"}>Login</Link>
                    </h4>
                   
                    {/* <h4>
                        <Link to={""}>Add Cart</Link>
                    </h4>  */}
                </ul>
                


            </ListItemIcon>
            </ListItemButton>

    </List>

    </Drawer>
    <IconButton sx={{marginLeft:"auto"}} onClick={handleOpen}>
        <MenuIcon/>
    </IconButton>
    
    </>
  )
}

export default DrawerComp