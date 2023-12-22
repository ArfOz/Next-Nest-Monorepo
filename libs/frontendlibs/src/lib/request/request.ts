export async function RequestNextNest(
    address: string,
    method = 'GET',
    token?: string,
    raw?: object
) {
    try {
        let headers: HeadersInit = {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };
        if (token) {
            headers = { ...headers, Authorization: `Bearer ${token}` };
        }

        const raww = JSON.stringify(raw);
        const requestOptions: RequestInit = {
            method,
            body: raww,
            headers,
            cache: 'no-cache'
        };

        const url = `${process.env['NX_BACKEND_URL']}/${address}`;
        const data = await fetch(url, requestOptions);
        const response = await data.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}
