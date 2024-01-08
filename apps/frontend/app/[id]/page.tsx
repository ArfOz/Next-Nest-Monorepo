import { RequestNextNest } from '@frontendlibs';
<<<<<<< HEAD
import { CityDetailsPage } from './CityDetailsPage';
import { CityDetailsJsonDto } from '../components';
=======
import { CityDetailsJsonDto } from '../components/dtos/CityDetails.dto';
import { CityDetailsPage } from '../components/CityDetailsPage/CityDetailsPage';
>>>>>>> 09ced75659f1d5817d041045a953e976fa435a50

async function GetData(id: string) {
    const data = await RequestNextNest(`restaurant/getrestaurant/${id}`, 'GET');

    return data.Data;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data: CityDetailsJsonDto = await GetData(params.id);
    return <CityDetailsPage data={data} />;
}
