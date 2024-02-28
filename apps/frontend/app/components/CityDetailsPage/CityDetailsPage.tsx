'use client'
import { useEffect } from 'react'
import io from 'socket.io-client'
import AddComment from '../AddComment/AddComment'
import { Comments } from '../Comments'
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails'
import { CityDetailsJsonDto, CommentDetails } from '../dtos'

const socket = io('http://localhost:80/events') // Replace with your server URL

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
	useEffect(() => {
		// Listen for incoming messages
		socket.on('like', (message: any) => {

			const result = data.comments.find((id)=> id === )
			console.log('arif', message)
		})
	}, [])

	const CommentsMapper = (
		<div className="flex flex-col items-center">
			{data?.comments?.map((commentData:CommentDetails) => (
				<Comments
					key={commentData.id}
					comments={commentData}
					// like={like}
				/>
			))}
		</div>
	)

	const NoComment = (
		<div className="text-center">Herhangi bir yorum bulunmamaktadır</div>
	)

	return (
		<>
			<RestaurantDetails data={data} />
			{data?.comments?.length > 0 ? CommentsMapper : NoComment}
			<AddComment restaurant_id={data?.restaurant.id} />
		</>
	)
}
