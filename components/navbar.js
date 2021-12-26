import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../context/CartContext";
import Link from 'next/link';
import Cart from "./cart";
import Fade from 'react-reveal/Fade';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      background: "#897dff"
    },
}));

export default function Navbar() {
    const { setCartOpen } = useCart();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 0);
    })

    return (
        <Fade when={loaded} duration={1500}>
            <nav className='nav_wrapper'>
                <div className='nav_content'>
                    <span className='nav_start'>
                        <img className='logo' src="https://res.cloudinary.com/dxqmbhsis/image/upload/v1639881399/aoco_logo_hvcty3.png"/>
                        <Link href="/">HOME</Link>
                        <Link href="/shop">SHOP</Link>
                        <Link href="/about">ABOUT</Link>
                    </span>
                    <span className='nav_end'>
                        <p>SIGN IN</p>
                        <hr/>
                        <IconButton className='nav_menu nav_icon_button' aria-label="nav-menu">
                            <MenuIcon />
                        </IconButton>
                        <IconButton className='nav_icon_button' aria-label="nav-cart" onClick={() => setCartOpen(true)}>
                            <StyledBadge badgeContent={1} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </span>
                </div>
                <Cart/>
            </nav>
        </Fade>
    )
}