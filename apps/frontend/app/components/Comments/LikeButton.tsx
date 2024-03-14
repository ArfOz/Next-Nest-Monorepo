import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { Session } from 'next-auth'
import { useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:80/events') // Replace with your server URL

export const LikeButton = ({
	like = false,
	commentId,
	session
}: {
	like: boolean
	commentId: string
	session: Session | null
}) => {
	const sendMessage = (commentId: string, liked: boolean) => {
		socket.send({
			commentId,
			liked: true,

			token: 'Bearer ' + session?.accessToken
		})
	}
	const [liked, setLiked] = useState(like)
	const handleClick = () => {
		setLiked(!liked)
		sendMessage(commentId, liked)
	}
	if (liked)
		return (
			<button onClick={handleClick}>
				<HandThumbUpIcon
					className="h-6 w-6 text-red-600"
					stroke="black"
					fill="white"
					strokeWidth={1.2}
				/>
			</button>
		)
	return (
		<button onClick={handleClick}>
			<HandThumbUpIcon className="h-6 w-6" />
		</button>
	)
}
