import Image from "next/image";
import type { Metadata } from "next";
import { readStore } from "@/lib/db";
import { PageHeader } from "@/components/site/page-header";
import { WhyTheVite } from "@/components/site/why-the-vite";
import { InstagramSection } from "@/components/site/instagram-section";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { settings } = await readStore();
  const paragraphs = settings.brandStory.body
    .split("\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <PageHeader eyebrow="Our story" title="About The Vite" />

      <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
            <Image
              src={settings.brandStory.image || settings.hero.mobileImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 92vw"
              className="object-cover"
            />
          </div>

          <div className="max-w-xl lg:pt-6">
            <h2 className="display-xl text-[clamp(1.75rem,3.5vw,2.75rem)] text-fg">
              <span className="block">{settings.brandStory.titleLine1}</span>
              <span className="block">{settings.brandStory.titleLine2}</span>
            </h2>

            <div className="mt-7 space-y-5 text-sm leading-relaxed text-muted">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-line-soft pt-8">
              <div>
                <dt className="display-xl text-3xl text-fg">{settings.location}</dt>
                <dd className="mt-1.5 text-xs text-muted">Where we are based</dd>
              </div>
              <div>
                <dt className="display-xl text-3xl text-fg">{settings.instagram.handle}</dt>
                <dd className="mt-1.5 text-xs text-muted">Find us on Instagram</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <WhyTheVite block={settings.why} />
      <InstagramSection block={settings.instagram} />
    </>
  );
}
