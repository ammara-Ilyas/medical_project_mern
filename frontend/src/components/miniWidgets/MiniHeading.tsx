type MiniHeadingProps = {
  heading: string;
  text: string;
};

export default function MiniHeading({ heading, text }: MiniHeadingProps) {
  return (
    <div className="mb-4">
      <div className="uppercase text-[#159EEC] font-semibold tracking-widest text-sm">{text}</div>
      <h2 className="text-2xl md:text-3xl font-bold text-[#1F2B6C]">{heading}</h2>
    </div>
  );
} 