import Link from "next/link";
import Image from "next/image";
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer_content">
                <hr/>
                <img className='footer_logo' src="https://res.cloudinary.com/dxqmbhsis/image/upload/v1639881399/aoco_logo_hvcty3.png"/>
                <span className="footer_links">
                    <Link href="/">HOME</Link>
                    <Link href="/">SHOP</Link>
                    <Link href="/">ABOUT</Link>
                    <Link href="/">REPO</Link>
                </span>
                <div className="footer_icons">
                    <TwitterIcon/>
                    <LinkedInIcon/>
                    <GitHubIcon style={{marginRight: '2rem'}}/>
                    <Image src="/discord_logo.svg" height={28} width={28} />
                </div>
            </div>
        </div>
    );
}