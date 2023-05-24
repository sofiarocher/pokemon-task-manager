import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRef, useEffect } from 'react';
import backgroundVideo from "../assets/background.mp4"
import Link from '@mui/material/Link';


function Nav() {
    const videoRef = useRef(null);

    useEffect(() => {
        videoRef.current.play();
    }, []);

    const appContainer = {
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        width:"100%",
    }

    const appBarStyles = {
        position: 'static',
 
    };
    
    const videoStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: "-1",
    };

    return (
        <div sx={appContainer}>
            <AppBar sx={{appBarStyles, width: '100%', textAlign: 'center'}}>
                <Toolbar>
                    <Link href='/tasks' sx={{textDecoration:"none"}}>
                        <Typography variant="h4" sx={{color: '#FF0000', fontWeight:"800"}}>
                            PokeTask
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Link href="/tasks">
                        <Button color="inherit" sx={{color: '#FF0000', fontWeight:"800"}}> Tasks</Button>
                    </Link>
                </Toolbar>
                <video ref={videoRef} style={videoStyles} loop muted autoPlay>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </AppBar>
        </div>
      );
}

export default Nav