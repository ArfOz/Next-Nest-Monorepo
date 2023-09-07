import SimpleMap from './components/HomePage';

async function getData() {
    const data = (
        await fetch('http://localhost:3000/api/restaurant/getall', {
            cache: 'no-cache',
        })
    ).json();

    console.log('arif', await data);
    return data;
}

const page = async () => {
    const data = await getData();
    return <SimpleMap cities={data} />;
};

export default page;
