import { base_url } from "../utils/url";

const OrderService = {
    fetchOrder: async(id) => {
        const url = new URL(`${base_url}/api/order`);
        const params = { id };
        url.search = new URLSearchParams(params).toString();
        const res = await fetch(url);
        return await res.json();
    },
    createOrder: async(payload) => {
      const res = await fetch(`${base_url}/api/order`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      return await res.json();
    },
};

export default OrderService;