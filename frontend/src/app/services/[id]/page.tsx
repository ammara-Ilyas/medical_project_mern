import SingleServiceSection from "@/components/widgets/services/SingleServiceSection";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import BannerSection from "@/components/widgets/about/BannerSection";

type Service = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  icon?: string;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const service = await getService(params.id);
  if (!service) return {};
  return {
    title: `${service.title} | MEDDICAL`,
    description: service.description,
  };
}

async function getService(id: string): Promise<Service | null> {
  const filePath = path.join(process.cwd(), "public/data/services.json");
  const data = await fs.readFile(filePath, "utf-8");
  const services: Service[] = JSON.parse(data).map((s: any, idx: number) => ({ id: s.id ?? idx, ...s }));
  return services.find((s) => String(s.id) === id) || null;
}
const section={
  image:"/images/services/single_hero.png",
  breadcrumb:"Home / Services / Free Checkup",
  title:"Free Checkup"
}
export default async function ServicePage({ params }: { params: { id: string } }) {
  const service = await getService(params.id);
  if (!service) return notFound();
  return (
<>
<BannerSection section={section} />
    <SingleServiceSection service={service} />;
</>
  )
} 