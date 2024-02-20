import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const LikeButton = () => {
	const [liked, setLiked] = useState(false)
	const handleClick = () => {
		setLiked(!liked)
	}
	if (liked)
		return (
			<HandThumbUpIcon
				className="h-6 w-6 text-red-600"
				stroke="black"
				fill="white"
				strokeWidth={1.2}
			/>
		)
	return <HandThumbUpIcon className="h-6 w-6" />
}
