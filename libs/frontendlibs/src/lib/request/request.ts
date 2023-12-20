export async function RequestNextNest(
    address: string,
    method = 'GET',
    token?: string,
    raw?: string
) {
    try {
        // myHeaders.append('Content-Type', 'application/json');
        // token && myHeaders.append('Authorization', `Bearer ${token}`);
        // myHeaders.append('Cache-Control', 'no-cache');

        // console.log('headers', myHeaders);
        const requestOptions = {
            method,
            // headers: myHeaders,
            body: raw || null,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        };

        token && { ...requestOptions, Authorization: `Bearer ${token}` };

        console.log('request options', requestOptions);
        const url = `${process.env['NX_BACKEND_URL']}/${address}`;
        console.log('urlll', url);
        const data = await fetch(url, requestOptions);
        const response = await data.json();
        console.log('response', response);
        return response;
    } catch (error) {
        console.log(error);
    }
}
