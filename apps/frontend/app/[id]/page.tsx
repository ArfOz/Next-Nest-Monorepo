import { RequestNextNest } from '@frontendlibs';
import { CityDetailsJsonDto } from '../components/dtos/CityDetails.dto';
import { CityDetailsPage } from '../components/CityDetailsPage/CityDetailsPage';

async function GetData(id: string) {
    const data = await RequestNextNest(`restaurant/getrestaurant/${id}`, 'GET');

    return data.Data;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data: CityDetailsJsonDto = await GetData(params.id);
    return <CityDetailsPage data={data} />;
}
