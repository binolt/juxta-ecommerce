export default function Product(props) {
    return (
        <div>
            {props.product.title}
        </div>
    );
};


export const getServerSideProps = async (ctx) => {
    const {pid} = ctx.query;

    // fetch product based off pid
    const res = await fetch(`http://localhost:3000/api/product/${pid}`);
    const product = await res.json();

    return {
        props:{
            product
        }
    }
}