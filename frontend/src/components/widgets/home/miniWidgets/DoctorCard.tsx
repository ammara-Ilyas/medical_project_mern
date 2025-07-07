import Image from 'next/image'
import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
type DocItem = {
    name: string;
    date?: string;
    author?: string;
    image: string;
    views?: number;
    likes?: number;
    specialty: string;
    linkedin: string;
    facebook: string;
    twitter: string;
  }
  
  interface NewCardProps {
    doc: DocItem;
  }
  

const DoctorCard: React.FC<NewCardProps>  = ({doc}) => {
  return (
    <div>  <div className="w-full h-64 relative">
    <Image
      src={doc.image}
      alt={doc.name}
      fill
      className="object-cover"
    />
  </div>
  <div className="bg-[#BFD2F8] p-4 text-center">
    <div className="font-semibold text-[#1F2B6C]">{doc.name}</div>
    <div className="uppercase text-xs text-[#1F2B6C] font-bold tracking-widest">{doc.specialty}</div>
    <div className="flex justify-center gap-4 mt-2">
      <a href={doc.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn className="text-[#1F2B6C] hover:text-[#159EEC]" /></a>
      <a href={doc.facebook} target="_blank" rel="noopener noreferrer"><FaFacebookF className="text-[#1F2B6C] hover:text-[#159EEC]" /></a>
      <a href={doc.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="text-[#1F2B6C] hover:text-[#159EEC]" /></a>
    </div>
  </div>
  <button className="bg-[#1F2B6C] text-white font-semibold py-2 w-full">View Profile</button>
</div>
  )
}

export default DoctorCard