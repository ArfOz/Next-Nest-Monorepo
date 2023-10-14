import { CityDetailsJsonDto } from '../Dtos/CityDetails.dto';
import { CityDetailsPage } from './CityDetailsPage';

async function GetData(id: string) {
    let data;
    try {
        data = // Change url for docker
            (
                await fetch(
                    `http://localhost:3300/api/restaurant/getrestaurant/${id}`,
                    {
                        cache: 'no-cache',
                    },
                )
            ).json();
    } catch (error) {
        console.log(error);
    }
    return data;
}

export default async function Page({ params }: { params: { id: string } }) {
    const data: CityDetailsJsonDto = await GetData(params.id);
    return <CityDetailsPage data={data} />;
}
