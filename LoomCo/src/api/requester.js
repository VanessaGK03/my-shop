import { getToken } from "../utils/userUtils";

export default async function requester(method, url, body) { 
    switch (method) {
        case "GET": {
            let response = await fetch(url, {
                method: "GET",
                headers: {
                    authorization: getToken(),
                }
            })
            // eslint-disable-next-line no-case-declarations
            let data = await response.json();
            return data;
        }
        case "POST": {
            // eslint-disable-next-line no-case-declarations
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json'
                }
            })
            // eslint-disable-next-line no-case-declarations
            let data = await response.json();
            return data;
        }
        case "PUT":{
            let response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json'
                }
            })
            // eslint-disable-next-line no-case-declarations
            let data = await response.json();
            return data;
        }
        case "DELETE":{
            let response = await fetch(url, {
                method: "DELETE",
                headers: {
                    authorization: getToken(),
                    'Content-Type': 'application/json'
                }
            })
            // eslint-disable-next-line no-case-declarations
            let data = await response.json();
            return data;
        }
    }
}