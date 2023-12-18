export async function RequestNextNest(
    url: string,
    method = 'GET',
    session?: string
) {
    try {
        const data = await fetch(`${process.env['BACKEND_URL']}/${url}`, {
            cache: 'no-cache',
            method
        });
        const response = await data.json();
        if (response?.Success) {
            return response.Data;
        }
        if (response?.Error) {
            return response.Data;
        }
    } catch (error) {
        console.log(error);
    }
}
