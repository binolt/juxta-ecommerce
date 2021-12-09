import { parseCookies } from "nookies";

export default function SingleOrder(props) {
    return (
        <div>
            <p>Here's your order!</p>
            {JSON.stringify(props.current_order)}
        </div>
    );
}

export const getServerSideProps = async (ctx) => {

    const {current_order} = parseCookies(ctx);

    if(!current_order) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props:{
            current_order: JSON.parse(current_order)
        }
    }
}