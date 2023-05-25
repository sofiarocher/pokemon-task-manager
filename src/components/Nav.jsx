import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';


function Nav() {
    const appContainer = {
        position: "relative", 
        minHeight: "100vh"
    }

    const appBarStyles = {
        position: 'absolute', 
        width: '100%',
        zIndex: "1",
 
    };
    
    return (
        <div sx={appContainer}>
            <AppBar sx={{appBarStyles, width: '100%', textAlign: 'center', background:"transparent"}}>
                <Toolbar>
                    <Link href='/' sx={{textDecoration:"none"}}>
                        <Typography variant="h4" sx={{color: '#FFFACD', fontWeight:"800"}}>
                            PokeTask
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link href="/tasks">
                        <Button color="inherit" sx={{color: '#FFFACD', fontWeight:"800"}}> Tasks</Button>
                    </Link>
                </Toolbar>
                
            </AppBar>
        </div>
      );
}

export default Nav