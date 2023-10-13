import { CitiesJsonDto } from './Dtos';
import SimpleMap from './components/HomePage';

const defaultCity = {
    id: '64f8f470cfdc52d6f006d1e4',
    name: 'Mission Chinese Food',
    lat: '40.713829',
    lon: '-73.989667',
};

async function GetData() {
    let data;
    try {
        data = // Change url for docker
            (
                await fetch('http://localhost:3300/api/restaurant/getall', {
                    cache: 'no-cache',
                })
            ).json();
    } catch (error) {
        console.log(error);
    }
    return data || [defaultCity];
}

const Page = async () => {
    const data: Array<CitiesJsonDto> = await GetData();
    return <SimpleMap cities={data} />;
};

export default Page;
