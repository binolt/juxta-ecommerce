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
                <img src="https://res.cloudinary.com/dxqmbhsis/image/upload/v1639680022/logo_s4h872.png"/>
                <span>
                    <Link href="/">HOME</Link>
                    <Link href="/shop">SHOP</Link>
                    <Link href="/about">ABOUT</Link>
                    <IconButton style={{marginLeft: '1.5rem'}} aria-label="nav-cart" onClick={() => setCartOpen(true)}>
                        <StyledBadge badgeContent={1} color="secondary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                    </IconButton>
                    <IconButton style={{marginLeft: '1.5rem'}} aria-label="nav-search">
                        <SearchIcon/>
                    </IconButton>
                </span>
            </div>
            <Cart/>
        </nav>
    )
}