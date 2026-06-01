import { notFound } from "next/navigation";
import { ContractorPhotoViewerView } from "@/components/product/contractor/ContractorPhotoViewerView";
import { getLeadById } from "@/lib/contractor/mock-data";

type PhotoViewerPageProps = {
  params: Promise<{ leadId: string; photoId: string }>;
};

/** 04.01 — Photo Viewer */
export default async function ContractorPhotoViewerPage({ params }: PhotoViewerPageProps) {
  const { leadId, photoId } = await params;
  const lead = getLeadById(leadId);
  if (!lead) notFound();

  const photoIndex = lead.photos.findIndex((photo) => photo.id === photoId);
  if (photoIndex === -1) notFound();

  return <ContractorPhotoViewerView lead={lead} initialPhotoIndex={photoIndex} />;
}
