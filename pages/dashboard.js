import { useRef, useState } from "react";
import { getServerSession } from "../lib/auth/session";

export default function Dashboard(props) {
    const [tempFile, setTempFile] = useState(null);

    const titleRef = useRef(null);
    const priceRef = useRef(null);
    const categoryRef = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        const price = priceRef.current.value;
        const category = categoryRef.current.value;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("image", tempFile);
        formData.append("category", category);

        const res = await fetch("/api/product/create", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        console.log(data)


        console.log(formData)
    }

    const handleChange = (e) => {
        const files = e.target.files;
        const file = files[0];
        //updates temp image to chosen file image
        if (file) {
          const reader = new FileReader();
          reader.addEventListener("load", function () {
            // setTempImage(this.result);
          });
          reader.readAsDataURL(file);
        }
        setTempFile(file);
    }

    return (
        <div>
            <h1>Create a new product !</h1>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: 'column', width: 250}}>
                <input ref={titleRef} type="text" placeholder="Title"/>
                <input ref={categoryRef} type="text" placeholder="Category"/>
                <input ref={priceRef} type="text" placeholder="Price"/>
                <input onChange={handleChange} accept="image/*" type="file"/>
                <button type="submit">Submit</button>
            </form>
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