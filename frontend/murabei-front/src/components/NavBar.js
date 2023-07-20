import React from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookIcon from '@mui/icons-material/Book';
import SubjectIcon from '@mui/icons-material/Subject';

const useStyles = makeStyles({
    drawer: {
        width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 240,
    },
    drawerContainer: {
        overflow: 'auto',
    },
});

function Navbar() {
    const classes = useStyles();

    const NavLinks = [
        { text: 'Author', icon: <AccountCircleIcon />, link: '/author' },
        { text: 'Book', icon: <BookIcon />, link: '/book' },
        { text: 'Subject', icon: <SubjectIcon />, link: '/subject' },
    ];

    return (
        <div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={true}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List>
                        {NavLinks.map((link, index) => (
                            <ListItem
                                button
                                component={Link}
                                to={link.link}
                                key={index}
                            >
                                <ListItemIcon>{link.icon}</ListItemIcon>
                                <ListItemText primary={link.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default Navbar;