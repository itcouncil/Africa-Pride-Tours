"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import type { PageContent } from "@/lib/content";
import { logoConcepts, services, testimonials, trustPoints, whatsappNumber } from "@/lib/content";
import { ImagePanel } from "@/components/ImagePanel";
import { InquiryForm } from "@/components/InquiryForm";
import { Reveal } from "@/components/Reveal";
import { RouteMap } from "@/components/RouteMap";
import { BrandMark } from "@/components/Logo";

export function PageExperience({ page }: { page: PageContent }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 130]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.08]);

  return (
    <main>
      <section className="hero-vignette relative min-h-[100svh] overflow-hidden bg-[#10100f]">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 image-fallback">
          <Image
            src={page.image}
            alt={page.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-70`} aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-14 pt-32 md:pb-20">
          <div className="grid w-full gap-10 lg:grid-cols-[1fr_390px] lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xs font-bold uppercase tracking-[0.32em] text-[#f6d78c]"
              >
                {page.eyebrow}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="cinematic-text font-display mt-5 max-w-5xl text-5xl font-semibold leading-[0.96] text-white sm:text-7xl lg:text-8xl"
              >
                {page.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.8 }}
                className="mt-7 max-w-2xl text-base leading-8 text-white/78 md:text-xl"
              >
                {page.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.86, duration: 0.8 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="#journeys" className="gold-gradient inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#10100f]">
                  {page.primaryCta}
                  <ArrowRight size={18} />
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello Pride of Africa Journeys, I am interested in ${page.navLabel}.`)}`}
                  className="inline-flex items-center justify-center rounded-full border border-white/26 bg-white/10 px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white backdrop-blur transition hover:bg-white hover:text-[#10100f]"
                >
                  {page.secondaryCta}
                </a>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 26 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="glass rounded-[1.75rem] p-5"
            >
              <div className="grid grid-cols-3 gap-3">
                {page.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
                    <p className="font-display text-2xl text-[#f5d58a]">{stat.value}</p>
                    <p className="mt-2 text-[0.66rem] uppercase leading-4 tracking-[0.14em] text-white/58">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-white/70">{page.narrative}</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-16 bg-gradient-to-t from-[#10100f] to-transparent" aria-hidden="true" />
      </section>

      <section id="journeys" className="bg-[#10100f] px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6922f]">Experience system</p>
            <h2 className="font-display mt-5 text-4xl leading-tight md:text-6xl">Emotion, trust, and logistics in one elegant flow.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.035}>
                  <Link href={service.href} className="group block h-full rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-[#c6922f]/50 hover:bg-white/[0.075]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#c6922f] text-[#10100f]">
                        <Icon size={20} />
                      </div>
                      <ArrowRight className="text-white/30 transition group-hover:text-[#c6922f]" size={18} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/58">{service.copy}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1e8] px-6 py-20 text-[#10100f] md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <Reveal>
            <ImagePanel src={page.image} alt={`${page.title} visual story`} className="aspect-[4/5] rounded-[2rem] md:aspect-[5/4]" />
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#6b4a2e]">Storytelling layer</p>
            <h2 className="font-display mt-5 text-4xl leading-tight md:text-6xl">{page.narrative}</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {page.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-semibold shadow-sm">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1f4d3a] text-white">
                    <Check size={15} />
                  </span>
                  {highlight}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f7f1e8] px-6 pb-20 text-[#10100f] md:pb-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6922f]">Curated experiences</p>
                <h2 className="font-display mt-4 max-w-3xl text-4xl leading-tight md:text-6xl">Designed around how the journey should feel.</h2>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-[#10100f] px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white">
                Start planning <ArrowRight size={18} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.experiences.map((experience, index) => (
              <Reveal key={experience.title} delay={index * 0.08}>
                <article className="min-h-72 rounded-[1.5rem] bg-white p-7 shadow-[0_24px_80px_rgba(107,74,46,0.10)]">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c6922f]">{experience.meta}</p>
                  <h3 className="font-display mt-5 text-3xl">{experience.title}</h3>
                  <p className="mt-5 text-sm leading-7 text-[#71685c]">{experience.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#10100f] px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <RouteMap />
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6922f]">Journey rhythm</p>
              <h2 className="font-display mt-5 text-4xl leading-tight md:text-6xl">A travel flow built for calm confidence.</h2>
            </Reveal>
            <div className="mt-9 grid gap-4">
              {page.itinerary.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="grid gap-5 rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 md:grid-cols-[96px_1fr]">
                    <div className="font-display text-3xl text-[#c6922f]">{item.day}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/62">{item.copy}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1e8] px-6 py-20 text-[#10100f] md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#6b4a2e]">Luxury logo suite</p>
            <h2 className="font-display mt-5 max-w-4xl text-4xl leading-tight md:text-6xl">A brand identity that can live on vehicles, proposals, social media, and premium guest touchpoints.</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {logoConcepts.map((concept, index) => (
              <Reveal key={concept.name} delay={index * 0.06}>
                <div className="flex min-h-72 flex-col justify-between rounded-[1.5rem] bg-white p-6 shadow-sm">
                  <BrandMark className="h-20 w-20 text-[#c6922f]" />
                  <div>
                    <h3 className="font-display text-2xl">{concept.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#71685c]">{concept.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#10100f] px-6 py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6922f]">Social proof</p>
            <h2 className="font-display mt-5 text-4xl leading-tight md:text-6xl">Trust is designed into every handoff.</h2>
            <div className="mt-8 grid gap-4">
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div key={point.title} className="flex gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.045] p-5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#c6922f] text-[#10100f]">
                      <Icon size={19} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{point.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{point.copy}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
          <div className="grid gap-5">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <figure className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-6">
                  <div className="flex gap-1 text-[#c6922f]" aria-label="5 star review">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="font-display mt-5 text-2xl leading-snug">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-5 text-sm text-white/60">
                    <strong className="text-white">{testimonial.name}</strong> · {testimonial.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f1e8] px-6 py-20 text-[#10100f] md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#c6922f]">Inquiry system</p>
            <h2 className="font-display mt-5 text-4xl leading-tight md:text-6xl">Tell us the journey. We will shape the path.</h2>
            <p className="mt-6 text-base leading-8 text-[#71685c]">
              Use the form for custom planning or WhatsApp for the fastest response. The form routes your brief into a structured booking message.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
