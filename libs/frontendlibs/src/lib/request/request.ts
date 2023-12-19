export async function RequestNextNest(
    address: string,
    method = 'GET',
    token?: string
) {
    try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
            method,
            headers: myHeaders
        };
        const url = `${process.env['NX_BACKEND_URL']}/${address}`;
        const data = await fetch(url, requestOptions);
        const response = await data.json();
        // console.log('response', response);
        return response;
    } catch (error) {
        console.log(error);
    }
}
