import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageExperience } from "@/components/PageExperience";
import { pages } from "@/lib/content";
import { readCmsState } from "@/lib/admin-store";

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

  const cms = await readCmsState();
  const override = cms.pages.find((item) => item.slug === slug);

  return {
    title: override?.title || page.seoTitle,
    description: override?.description || page.description,
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

  const cms = await readCmsState();
  const override = cms.pages.find((item) => item.slug === slug);
  const mergedPage = {
    ...page,
    title: slug === "home" ? cms.hero.headline : override?.title || page.title,
    description: slug === "home" ? cms.hero.subheadline : override?.description || page.description,
    primaryCta: slug === "home" ? cms.hero.primaryCta : page.primaryCta,
    secondaryCta: slug === "home" ? cms.hero.secondaryCta : page.secondaryCta
  };

  return <PageExperience page={mergedPage} />;
}
