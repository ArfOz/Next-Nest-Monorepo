'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import AddComment from '../AddComment/AddComment'
import { Comments } from '../Comments'
import RestaurantDetails from '../RestaurantDetails/RestaurantDetails'
import {
	CityDetailsJsonDto,
	CommentDetails,
	WebSocketMessageDto
} from '../dtos'

const socket = io('http://localhost:80/events') // Replace with your server URL

export const CityDetailsPage = ({ data }: { data: CityDetailsJsonDto }) => {
	const { data: session, status, update } = useSession()
	const [likeData, setLikeData] = useState({
		msg: '',
		commentId: '',
		likeNum: 0
	})

	useEffect(() => {
		// Listen for incoming messages
		socket.on('like', (message: WebSocketMessageDto) => {
			const result = data?.comments?.find(
				({ id }) => id === message.commentId
			)

			setLikeData(message)
		})
	}, [])

	const CommentsMapper = (
		<div className="flex flex-col items-center">
			{data?.comments?.map((commentData: CommentDetails) => (
				<Comments
					key={commentData.id}
					comments={commentData}
					likeData={
						commentData.id === likeData?.commentId ? likeData : null
					}
					session={session}
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
