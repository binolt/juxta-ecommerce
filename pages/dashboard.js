import { getServerSession } from "../lib/auth/session";

export default function Dashboard(props) {
    return (
        <div>
            {props.data}
        </div>
    );
}


export const getServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx);

    if(!session) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props:{
            data: 'u are allowed here :3'
        }
    }
}