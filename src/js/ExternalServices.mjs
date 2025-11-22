export const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const body = await res.json();

  if (res.ok) {
    return body
  } else {
    throw {
      message: "Server returned an error",
      status: res.status,
      statusText: res.statusText,
      details: body
    };
  }
}

export default class ExternalServices {
  constructor() {
    this.url = "https://wdd330-backend.onrender.com/checkout";
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }

  async submitOrder(orderData) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    }

    const response = await fetch(this.url, options)
    return convertToJson(response)
  }
}
