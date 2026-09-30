"use client";

import { useActionState } from "react";
import { saveSettingsAction, type ActionState } from "@/app/admin/actions";
import { Field, FormMessage, Input, Panel, Select, SubmitButton, Textarea, Toggle } from "./ui";
import { SingleImageField } from "./image-field";
import { FEATURE_ICON_NAMES } from "@/components/site/icons";
import type { Settings } from "@/lib/types";

const INITIAL: ActionState = { status: "idle", message: "" };

const linkLines = (links: { label: string; href: string }[]) =>
  links.map((l) => `${l.label} | ${l.href}`).join("\n");

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction] = useActionState(saveSettingsAction, INITIAL);
  const s = settings;

  return (
    <form action={formAction} className="space-y-6">
      <Panel title="Brand">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Store name" hint="Used in the page title and metadata.">
            <Input name="brandName" defaultValue={s.brandName} />
          </Field>
          <Field label="Wordmark" hint="The letters shown in the header and footer.">
            <Input name="brandMark" defaultValue={s.brandMark} />
          </Field>
          <Field label="Tagline">
            <Input name="tagline" defaultValue={s.tagline} />
          </Field>
          <SingleImageField
            name="logo"
            label="Logo"
            hint="Shown in the header, footer and brand story. Use a square image with a transparent background."
            defaultValue={s.logo}
          />
          <Field label="City" hint="Shown on the About page.">
            <Input name="location" defaultValue={s.location} />
          </Field>
          <div className="grid grid-cols-2 gap-5">
            <Field label="Currency symbol">
              <Input name="currency" defaultValue={s.currency} maxLength={3} />
            </Field>
            <Field label="Currency code">
              <Input name="currencyCode" defaultValue={s.currencyCode} maxLength={5} />
            </Field>
          </div>
          <Field label="Free shipping over" hint="Set to 0 to turn the message off.">
            <Input
              name="freeShippingThreshold"
              type="number"
              min="0"
              step="1"
              defaultValue={s.freeShippingThreshold}
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Announcement bar"
        description="Messages themselves live under Announcement bar."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Toggle
            name="announcementEnabled"
            label="Show the bar"
            defaultChecked={s.announcementEnabled}
          />
          <Field label="Seconds per message" hint="Only matters with two or more messages.">
            <Input
              name="announcementSeconds"
              type="number"
              min="2"
              max="60"
              defaultValue={s.announcementSeconds}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Navigation">
        <Field label="Top navigation" hint="One link per line, as: Label | /path">
          <Textarea name="nav" rows={6} defaultValue={linkLines(s.nav)} />
        </Field>
      </Panel>

      <Panel title="Hero" description="The full-screen opening of the home page.">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Eyebrow">
              <Input name="heroEyebrow" defaultValue={s.hero.eyebrow} />
            </Field>
            <Field label="Headline, line 1">
              <Input name="heroTitleLine1" defaultValue={s.hero.titleLine1} />
            </Field>
            <Field label="Headline, line 2">
              <Input name="heroTitleLine2" defaultValue={s.hero.titleLine2} />
            </Field>
          </div>

          <Field label="Sub-line">
            <Input name="heroSubtitle" defaultValue={s.hero.subtitle} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Primary button label">
              <Input name="heroCtaLabel" defaultValue={s.hero.ctaLabel} />
            </Field>
            <Field label="Primary button links to">
              <Input name="heroCtaHref" defaultValue={s.hero.ctaHref} />
            </Field>
            <Field label="Secondary button label" hint="Leave blank to hide it.">
              <Input name="heroSecondaryCtaLabel" defaultValue={s.hero.secondaryCtaLabel} />
            </Field>
            <Field label="Secondary button links to">
              <Input name="heroSecondaryCtaHref" defaultValue={s.hero.secondaryCtaHref} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SingleImageField
              name="heroImage"
              label="Hero image"
              hint="Wide shot. Keep the subject to the right."
              defaultValue={s.hero.image}
            />
            <SingleImageField
              name="heroMobileImage"
              label="Hero image, mobile"
              hint="Upright crop for phones."
              defaultValue={s.hero.mobileImage}
            />
          </div>
        </div>
      </Panel>


      <Panel title="New arrivals">
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Heading">
            <Input name="newArrivalsTitle" defaultValue={s.newArrivals.title} />
          </Field>
          <Field label="Sub-line">
            <Input name="newArrivalsSubtitle" defaultValue={s.newArrivals.subtitle} />
          </Field>
          <Field label="“View all” links to">
            <Input name="newArrivalsHref" defaultValue={s.newArrivals.href} />
          </Field>
        </div>
        <p className="mt-4 text-xs text-dim">
          Which products appear is set per product, with the “Show in New Arrivals” toggle.
        </p>
      </Panel>

      <Panel title="The Vite Edit" description="The large editorial block.">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Eyebrow">
              <Input name="editEyebrow" defaultValue={s.edit.eyebrow} />
            </Field>
            <Field label="Heading, line 1">
              <Input name="editTitleLine1" defaultValue={s.edit.titleLine1} />
            </Field>
            <Field label="Heading, line 2">
              <Input name="editTitleLine2" defaultValue={s.edit.titleLine2} />
            </Field>
          </div>
          <Field label="Description">
            <Textarea name="editText" rows={3} defaultValue={s.edit.text} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Button label">
              <Input name="editCtaLabel" defaultValue={s.edit.ctaLabel} />
            </Field>
            <Field label="Button links to">
              <Input name="editCtaHref" defaultValue={s.edit.ctaHref} />
            </Field>
          </div>
          <p className="text-xs text-dim">
            The left half of this block shows the logo, set under Brand.
          </p>
        </div>
      </Panel>

      <Panel title="Denim">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading">
              <Input name="denimTitle" defaultValue={s.denim.title} />
            </Field>
            <Field label="Sub-line">
              <Input name="denimSubtitle" defaultValue={s.denim.subtitle} />
            </Field>
          </div>
          <Field label="Fits" hint="One per line: LABEL | /link">
            <Textarea name="denimFits" rows={6} defaultValue={linkLines(s.denim.fits)} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Button label">
              <Input name="denimCtaLabel" defaultValue={s.denim.ctaLabel} />
            </Field>
            <Field label="Button links to">
              <Input name="denimCtaHref" defaultValue={s.denim.ctaHref} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="The Look" description="Front and back view of one outfit.">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading">
              <Input name="lookTitle" defaultValue={s.look.title} />
            </Field>
            <Field label="Sub-line">
              <Input name="lookText" defaultValue={s.look.text} />
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Left caption">
              <Input name="lookFrontLabel" defaultValue={s.look.frontLabel} />
            </Field>
            <Field label="Right caption">
              <Input name="lookBackLabel" defaultValue={s.look.backLabel} />
            </Field>
            <SingleImageField
              name="lookFrontImage"
              label="Left image"
              defaultValue={s.look.frontImage}
            />
            <SingleImageField
              name="lookBackImage"
              label="Right image"
              defaultValue={s.look.backImage}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Button label">
              <Input name="lookCtaLabel" defaultValue={s.look.ctaLabel} />
            </Field>
            <Field label="Button links to">
              <Input name="lookCtaHref" defaultValue={s.look.ctaHref} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="Why The Vite">
        <Field label="Heading">
          <Input name="whyTitle" defaultValue={s.why.title} />
        </Field>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {s.why.items.map((item, i) => (
            <div key={item.id} className="space-y-4 border border-line-soft p-4">
              <Field label={`Item ${i + 1} — icon`}>
                <Select name={`whyIcon${i}`} defaultValue={item.icon}>
                  {FEATURE_ICON_NAMES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Title">
                <Input name={`whyItemTitle${i}`} defaultValue={item.title} />
              </Field>
              <Field label="Description">
                <Textarea name={`whyItemText${i}`} rows={2} defaultValue={item.text} />
              </Field>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Style inspiration">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading">
              <Input name="styleTitle" defaultValue={s.styleInspiration.title} />
            </Field>
            <Field label="Sub-line">
              <Input name="styleSubtitle" defaultValue={s.styleInspiration.subtitle} />
            </Field>
          </div>
          <Field label="Tiles" hint="One per line: LABEL | /link | /image.jpg">
            <Textarea
              name="styleTiles"
              rows={5}
              defaultValue={s.styleInspiration.tiles
                .map((t) => `${t.label} | ${t.href} | ${t.image}`)
                .join("\n")}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Button label">
              <Input name="styleCtaLabel" defaultValue={s.styleInspiration.ctaLabel} />
            </Field>
            <Field label="Button links to">
              <Input name="styleCtaHref" defaultValue={s.styleInspiration.ctaHref} />
            </Field>
          </div>
        </div>
      </Panel>

      <Panel title="Instagram" description="The six-image grid linking to your profile.">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading">
              <Input name="instagramTitle" defaultValue={s.instagram.title} />
            </Field>
            <Field label="Sub-line">
              <Input name="instagramSubtitle" defaultValue={s.instagram.subtitle} />
            </Field>
            <Field label="Handle">
              <Input name="instagramHandle" defaultValue={s.instagram.handle} />
            </Field>
            <Field label="Profile URL">
              <Input name="instagramProfileUrl" defaultValue={s.instagram.profileUrl} />
            </Field>
          </div>
          <Field
            label="Grid images"
            hint="One per line: /image.jpg | https://link-to-the-post (link optional)"
          >
            <Textarea
              name="instagramTiles"
              rows={7}
              defaultValue={s.instagram.tiles
                .map((t) => `${t.image} | ${t.href}`)
                .join("\n")}
            />
          </Field>
          <Field label="Button label">
            <Input name="instagramCtaLabel" defaultValue={s.instagram.ctaLabel} />
          </Field>
        </div>
      </Panel>

      <Panel title="Brand story">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading, line 1">
              <Input name="storyTitleLine1" defaultValue={s.brandStory.titleLine1} />
            </Field>
            <Field label="Heading, line 2">
              <Input name="storyTitleLine2" defaultValue={s.brandStory.titleLine2} />
            </Field>
          </div>
          <Field label="Body" hint="One paragraph per line.">
            <Textarea name="storyBody" rows={4} defaultValue={s.brandStory.body} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Button label">
              <Input name="storyCtaLabel" defaultValue={s.brandStory.ctaLabel} />
            </Field>
            <Field label="Button links to">
              <Input name="storyCtaHref" defaultValue={s.brandStory.ctaHref} />
            </Field>
            <SingleImageField
              name="storyImage"
              label="Background image"
              defaultValue={s.brandStory.image}
            />
          </div>
        </div>
      </Panel>

      <Panel title="Newsletter">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Heading">
              <Input name="newsletterTitle" defaultValue={s.newsletter.title} />
            </Field>
            <Field label="Button label">
              <Input name="newsletterButton" defaultValue={s.newsletter.buttonLabel} />
            </Field>
          </div>
          <Field label="Sub-line">
            <Input name="newsletterText" defaultValue={s.newsletter.text} />
          </Field>
        </div>
      </Panel>

      <Panel title="Footer">
        <div className="space-y-5">
          <Field label="About text">
            <Textarea name="footerAbout" rows={3} defaultValue={s.footer.about} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {s.footer.columns.map((col, i) => (
              <div key={col.id} className="space-y-4 border border-line-soft p-4">
                <Field label={`Column ${i + 1} heading`}>
                  <Input name={`footerColTitle${i}`} defaultValue={col.title} />
                </Field>
                <Field label="Links" hint="Label | /path">
                  <Textarea
                    name={`footerColLinks${i}`}
                    rows={8}
                    defaultValue={linkLines(col.links)}
                  />
                </Field>
              </div>
            ))}
          </div>

          <Field label="Copyright line">
            <Input name="footerCopyright" defaultValue={s.footer.copyright} />
          </Field>
        </div>
      </Panel>

      <div className="sticky bottom-0 flex flex-wrap items-center justify-between gap-4 border border-line bg-surface px-5 py-4">
        <FormMessage state={state} />
        <SubmitButton className="ml-auto">Save settings</SubmitButton>
      </div>
    </form>
  );
}
