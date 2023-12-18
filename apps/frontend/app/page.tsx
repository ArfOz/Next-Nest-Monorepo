import { RequestNextNest } from '@frontendlibs';
import { CitiesJsonDto } from './Dtos';
import SimpleMap from './components/HomePage';

const defaultCity = {
    id: '64f8f470cfdc52d6f006d1e4',
    name: 'Mission Chinese Food',
    lat: '40.713829',
    lon: '-73.989667'
};

async function GetData() {
    try {
        const data = await RequestNextNest('restaurant/getall');

        const response = await data.json();
        if (response?.Success) {
            return response.Data;
        }
        return [defaultCity];
    } catch (error) {
        console.log(error);
    }
}

const Page = async () => {
    const data: Array<CitiesJsonDto> = await GetData();
    return <SimpleMap cities={data} />;
};

export default Page;
