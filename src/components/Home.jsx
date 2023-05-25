import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


const Home = () => {
    return (
        <div style={{paddingTop:"350px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <img src="../src/assets/waving-pikachu.gif" alt="Animated Pokemon" height={200} width={200} />
          <Link href="/tasks" underline="none">
            <Button variant="contained" sx={{textTransform:"capitalize", borderRadius:"30px", marginTop:"36px", marginRight:"24px", backgroundColor:"#FFFACD", color:"#696969",'&:hover': {color: 'white',backgroundColor: '#BDB76B',},}} >
                Create a task!
            </Button>
          </Link>
        </div>
      );
};

export default Home;