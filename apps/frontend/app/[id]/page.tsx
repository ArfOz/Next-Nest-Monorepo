import { RequestNextNest } from '@frontendlibs'
import { CityDetailsPage } from '../components/CityDetailsPage/CityDetailsPage'
import { CityDetailsJsonDto } from '../components/dtos/CityDetails.dto'

async function GetData(id: string) {
	const data = await RequestNextNest(`restaurant/getrestaurant/${id}`, 'GET')

	return data?.Data
}

export default async function Page({ params }: { params: { id: string } }) {
	const data: CityDetailsJsonDto = await GetData(params.id)
	return <CityDetailsPage data={data} />
}
