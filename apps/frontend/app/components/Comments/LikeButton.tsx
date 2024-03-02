import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const LikeButton = ({ like = false }) => {
	const [liked, setLiked] = useState(like)
	const handleClick = () => {
		setLiked(!liked)
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
