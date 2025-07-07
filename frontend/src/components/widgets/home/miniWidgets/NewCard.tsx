import Image from 'next/image'
import React from 'react'
import { FaEye, FaHeart } from 'react-icons/fa'

type NewsItem = {
  title: string;
  date: string;
  author: string;
  image: string;
  views?: number;
  likes?: number;
}

interface NewCardProps {
  item: NewsItem;
}

const NewCard: React.FC<NewCardProps> = ({ item }) => {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-28 h-24 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <div className="text-xs text-[#159EEC] mb-1">
          {item.date} | By {item.author}
        </div>
        <div className="font-semibold text-[#1F2B6C] mb-2 text-sm">{item.title}</div>
        <div className="flex gap-4 text-xs text-[#1F2B6C]">
          <span className="flex items-center gap-1"><FaEye /> {item.views}</span>
          <span className="flex items-center gap-1"><FaHeart className="text-[#E74C3C]" /> {item.likes}</span>
        </div>
      </div>
    </div>
  )
}

export default NewCard