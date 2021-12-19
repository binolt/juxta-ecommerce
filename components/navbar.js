import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../context/CartContext";
import Link from 'next/link';
import Cart from "./cart";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
}));

export default function Navbar() {
    const { setCartOpen } = useCart();

    return (
        <nav className='nav-wrapper'>
            <div className='nav-content'>
                <span className='flexstart'>
                    <img className='logo' src="https://res.cloudinary.com/dxqmbhsis/image/upload/v1639881399/aoco_logo_hvcty3.png"/>
                    <Link href="/">HOME</Link>
                    <Link href="/shop">SHOP</Link>
                    <Link href="/about">ABOUT</Link>
                </span>
                <span className='flexend'>
                    <p>Sign In</p>
                    <hr/>
                    <IconButton aria-label="nav-cart" onClick={() => setCartOpen(true)}>
                        <StyledBadge color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                </span>
            </div>
            <Cart/>
        </nav>
    )
}