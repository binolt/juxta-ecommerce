import mail from "@sendgrid/mail";

export default async (req, res) => {
    const { customer_email, customer_name, _id } = req.body;
    mail.setApiKey(process.env.SENDGRID_API_KEY);
    mail.send({
        to: customer_email,
        from: "luongosteven@gmail.com",
        subject: `Your order #${_id}`,
        text: "sending from sendgrid!!",
        html: `
        <div>
            <p>Hello ${customer_name},</p>
            <p>Order #${_id}<p>
            <a href='http://localhost:3000/orders/${_id}'>View your order</a>
        </div>
        `
    }).then((response) => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
    res.json({msg: "hello"});
}