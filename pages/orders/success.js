import { parseCookies } from "nookies";

export default function OrderSuccess() {
    return (
        <div>
            Successfull Order !
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    const { order_id } = parseCookies(ctx);
    const { purchaseId } = ctx.query;

    //ensure purchaseId exists and equals the order_id in cookies
    if(!order_id || !purchaseId || (order_id !== purchaseId)) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    //fetch data and display success message

    return {
        props:{
            data:null
        }
    }
}