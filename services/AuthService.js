const InvoiceService = {
    registerUser: async(data) => {
        const res = await fetch(`/api/auth/register`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return await res.json();
    },
    loginUser: async(data) => {
        const res = await fetch(`/api/auth/login`, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
        return await res.json();
    },
};

export default InvoiceService;