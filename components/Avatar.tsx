'use client';

import Image from "next/image";

interface AvatarProps {
	src: string | null | undefined;
	width: number
	height: number
}

const Avatar: React.FC<AvatarProps> = ({ src, width, height }) => {
	return (
		<Image className="mt-1 rounded-full" height={height}  width={width}  alt="Avatar"  src={src || '/img/placeholder.jpg'} />
	);
}

export default Avatar;