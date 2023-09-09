import { CitiesJsonDto } from './Dtos';
import SimpleMap from './components/HomePage';

async function getData() {
    const data = (
        await fetch('http://localhost:3000/api/restaurant/getall', {
            cache: 'no-cache',
        })
    ).json();
    return data;
}

const page = async () => {
    const data: Array<CitiesJsonDto> = await getData();
    return <SimpleMap cities={data} />;
};

export default page;
