import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageExperience } from "@/components/PageExperience";
import { pages } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`
    },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url: `/${page.slug}`,
      images: [{ url: page.image, width: 1600, height: 1000, alt: page.title }]
    }
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = pages.find((item) => item.slug === slug);

  if (!page) notFound();

  return <PageExperience page={page} />;
}
