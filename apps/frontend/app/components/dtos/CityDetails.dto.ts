import { CitiesJsonDto } from './Cities.dto'

export class CommentDetails {
	'id': string
	'restaurant_id': string
	'title': string
	'comment': string
	'star': number
	'updatedAt': string
	user: {
		username: string
		id: string
	}

	'usersLiked': [
		{
			user: {
				username: string
			}
		}
	]
}

export class CityDetailsJsonDto {
	restaurant: CitiesJsonDto
	comments: Array<CommentDetails>
}
