import React from "react";

export default function ContactMap() {
  return (
    <div className="w-full mb-10">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.911727972019!2d-74.0060156845936!3d40.71277577933009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c7c5b2b%3A0x7b7b7b7b7b7b7b7b!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: '12px', width: '100%' }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="mt-2 text-sm text-[#1F2B6C] font-semibold text-center">
        New York City Hall, New York, NY, USA (Demo Address)
      </div>
    </div>
  );
} 