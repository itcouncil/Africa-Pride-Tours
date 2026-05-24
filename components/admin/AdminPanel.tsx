"use client";

import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  CloudUpload,
  Edit3,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  MessageSquareText,
  Plus,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
  UsersRound
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { AdminCmsState, InquiryRecord, MediaAsset, OfferPost } from "@/lib/admin-schema";
import { defaultCmsState, serviceOptions } from "@/lib/admin-schema";

type Tab = "overview" | "operations" | "content" | "media" | "offers" | "inquiries";

const tabs: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "operations", label: "Operations", icon: ClipboardList },
  { id: "content", label: "Web Content", icon: Edit3 },
  { id: "media", label: "Media Library", icon: ImageIcon },
  { id: "offers", label: "Events & Offers", icon: Megaphone },
  { id: "inquiries", label: "Inquiries", icon: MessageSquareText }
];

const serviceNames = serviceOptions();

function classNames(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [cms, setCms] = useState<AdminCmsState>(defaultCmsState());
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadAdminState() {
      const [cmsResponse, inquiriesResponse] = await Promise.all([
        fetch("/api/admin/cms", { cache: "no-store" }),
        fetch("/api/admin/inquiries", { cache: "no-store" })
      ]);

      if (cmsResponse.ok) {
        setCms(await cmsResponse.json());
      }

      if (inquiriesResponse.ok) {
        const data = await inquiriesResponse.json();
        setInquiries(data.inquiries || []);
      }
    }

    loadAdminState();
  }, []);

  const pipelineValue = useMemo(
    () =>
      cms.operations.reduce((sum, item) => {
        const numeric = Number(item.value.replace(/[^0-9.]/g, ""));
        return sum + (Number.isFinite(numeric) ? numeric : 0);
      }, 0),
    [cms.operations]
  );

  const filteredPages = cms.pages.filter((page) =>
    `${page.slug} ${page.title} ${page.description}`.toLowerCase().includes(search.toLowerCase())
  );

  async function saveCms(nextCms = cms) {
    setIsSaving(true);
    setNotice("");

    const response = await fetch("/api/admin/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nextCms)
    });

    const data = await response.json();
    setIsSaving(false);

    if (response.ok) {
      setCms(data.cms);
      setNotice("Saved. Admin content state is up to date.");
    } else {
      setNotice(data.message || "Save failed.");
    }
  }

  function updateHero(field: keyof AdminCmsState["hero"], value: string) {
    setCms((current) => ({ ...current, hero: { ...current.hero, [field]: value } }));
  }

  function updatePage(slug: string, field: "title" | "description" | "status", value: string) {
    setCms((current) => ({
      ...current,
      pages: current.pages.map((page) => (page.slug === slug ? { ...page, [field]: value } : page))
    }));
  }

  function addOffer() {
    const offer: OfferPost = {
      id: `offer-${Date.now().toString(36)}`,
      title: "New Pride of Africa Offer",
      status: "Draft",
      category: serviceNames[0] || "Travel Offer",
      date: new Date().toISOString().slice(0, 10),
      price: "From $",
      summary: "Describe the experience, guest value, availability, and booking urgency."
    };

    setCms((current) => ({ ...current, offers: [offer, ...current.offers] }));
    setActiveTab("offers");
  }

  function updateOffer(id: string, field: keyof OfferPost, value: string) {
    setCms((current) => ({
      ...current,
      offers: current.offers.map((offer) => (offer.id === id ? { ...offer, [field]: value } : offer))
    }));
  }

  async function uploadMedia(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setNotice("Uploading media...");
    const response = await fetch("/api/admin/media", { method: "POST", body: formData });
    const data = await response.json();

    if (response.ok) {
      setCms((current) => ({ ...current, media: [data.media, ...current.media] }));
      setNotice("Media uploaded to the library.");
    } else {
      setNotice(data.message || "Upload failed.");
    }

    event.target.value = "";
  }

  return (
    <main className="min-h-screen bg-[#f7f1e8] text-[#10100f]">
      <section className="relative overflow-hidden bg-[#10100f] px-4 pb-8 pt-28 text-white md:px-6 md:pb-12">
        <div className="absolute inset-0 bg-[url('/brand/topography.svg')] opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#10100f] via-[#1f4d3a]/70 to-[#c6922f]/30" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f4d68a]">Pride of Africa Journeys</p>
              <h1 className="font-display mt-4 max-w-4xl text-4xl leading-tight md:text-6xl">Admin Command Center</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                Manage operations, inquiries, website content, media uploads, events, offers, and publishing readiness from one production-style workspace.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-[1.5rem] border border-white/10 bg-white/10 p-3 backdrop-blur md:min-w-[420px]">
              <MetricCard label="Pipeline" value={`$${pipelineValue.toLocaleString()}`} />
              <MetricCard label="Inquiries" value={String(inquiries.length)} />
              <MetricCard label="Live Pages" value={String(cms.pages.filter((page) => page.status === "Live").length)} />
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 border-b border-[#e7dccd] bg-[#f7f1e8]/90 px-4 py-3 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={classNames(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition",
                  activeTab === tab.id ? "bg-[#10100f] text-white" : "bg-white text-[#6b4a2e] hover:bg-[#eadfce]"
                )}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto max-w-7xl">
          {notice ? (
            <div className="mb-5 flex items-center justify-between rounded-2xl bg-[#1f4d3a] px-5 py-4 text-sm font-semibold text-white">
              <span>{notice}</span>
              <button type="button" onClick={() => setNotice("")} className="text-white/70 hover:text-white">
                Dismiss
              </button>
            </div>
          ) : null}

          {activeTab === "overview" ? (
            <Overview cms={cms} inquiries={inquiries} onAddOffer={addOffer} onTab={setActiveTab} />
          ) : null}

          {activeTab === "operations" ? (
            <Operations cms={cms} />
          ) : null}

          {activeTab === "content" ? (
            <ContentEditor
              cms={cms}
              search={search}
              filteredPages={filteredPages}
              isSaving={isSaving}
              onSearch={setSearch}
              onHero={updateHero}
              onPage={updatePage}
              onSave={() => saveCms()}
            />
          ) : null}

          {activeTab === "media" ? (
            <MediaLibrary media={cms.media} onUpload={uploadMedia} />
          ) : null}

          {activeTab === "offers" ? (
            <OffersEditor cms={cms} isSaving={isSaving} onAddOffer={addOffer} onOffer={updateOffer} onSave={() => saveCms()} />
          ) : null}

          {activeTab === "inquiries" ? (
            <InquiriesTable inquiries={inquiries} />
          ) : null}
        </div>
      </section>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#10100f]/35 p-4">
      <p className="font-display text-2xl text-[#f4d68a]">{value}</p>
      <p className="mt-2 text-[0.65rem] font-bold uppercase leading-4 tracking-[0.16em] text-white/60">{label}</p>
    </div>
  );
}

function Overview({
  cms,
  inquiries,
  onAddOffer,
  onTab
}: {
  cms: AdminCmsState;
  inquiries: InquiryRecord[];
  onAddOffer: () => void;
  onTab: (tab: Tab) => void;
}) {
  const cards = [
    { title: "Operations Pipeline", value: cms.operations.length, copy: "Active journeys needing planning, supplier, or guest actions.", icon: ClipboardList, tab: "operations" as Tab },
    { title: "Content Pages", value: cms.pages.length, copy: "Editable website page records with live/draft publishing status.", icon: FileText, tab: "content" as Tab },
    { title: "Media Assets", value: cms.media.length, copy: "Uploaded images and campaign files available to the web team.", icon: ImageIcon, tab: "media" as Tab },
    { title: "Events & Offers", value: cms.offers.length, copy: "Promotional posts, seasonal deals, and event-led campaigns.", icon: Megaphone, tab: "offers" as Tab }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              type="button"
              key={card.title}
              onClick={() => onTab(card.tab)}
              className="rounded-[1.25rem] bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1f4d3a] text-white">
                  <Icon size={19} />
                </span>
                <span className="font-display text-3xl text-[#c6922f]">{card.value}</span>
              </div>
              <h2 className="mt-6 text-lg font-bold">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[#71685c]">{card.copy}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel title="Today’s Control Room" icon={ShieldCheck}>
          <div className="grid gap-3">
            {[
              "Review new inquiries and assign a travel owner.",
              "Confirm supplier holds for high-priority active journeys.",
              "Publish one timely offer or event for conversion momentum.",
              "Upload fresh gallery media after every completed trip."
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f7f1e8] p-4 text-sm font-semibold text-[#1b1b1b]">
                <CheckCircle2 className="text-[#1f4d3a]" size={18} />
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Fast Actions" icon={Sparkles}>
          <div className="grid gap-3">
            <ActionButton icon={Plus} label="Create New Offer" onClick={onAddOffer} />
            <ActionButton icon={Upload} label="Open Media Uploads" onClick={() => onTab("media")} />
            <ActionButton icon={MessageSquareText} label={`Review ${inquiries.length} Inquiries`} onClick={() => onTab("inquiries")} />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Operations({ cms }: { cms: AdminCmsState }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <Panel title="Journey Operations Pipeline" icon={ClipboardList}>
        <div className="overflow-hidden rounded-2xl border border-[#e7dccd]">
          <table className="w-full min-w-[760px] border-collapse bg-white text-left text-sm">
            <thead className="bg-[#10100f] text-xs uppercase tracking-[0.16em] text-white">
              <tr>
                {["ID", "Guest", "Journey", "Stage", "Owner", "Priority", "Value"].map((heading) => (
                  <th key={heading} className="px-4 py-4 font-bold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cms.operations.map((item) => (
                <tr key={item.id} className="border-t border-[#e7dccd]">
                  <td className="px-4 py-4 font-bold text-[#6b4a2e]">{item.id}</td>
                  <td className="px-4 py-4">{item.guest}</td>
                  <td className="px-4 py-4">{item.journey}</td>
                  <td className="px-4 py-4">{item.stage}</td>
                  <td className="px-4 py-4">{item.owner}</td>
                  <td className="px-4 py-4">
                    <span className={classNames("rounded-full px-3 py-1 text-xs font-bold", item.priority === "High" ? "bg-[#c96a3d] text-white" : item.priority === "Medium" ? "bg-[#c6922f] text-[#10100f]" : "bg-[#1f4d3a] text-white")}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-bold">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Panel title="Operational Standards" icon={Settings2}>
        <div className="grid gap-4">
          {["Response under 15 minutes for WhatsApp leads", "Supplier confirmation before payment requests", "Guest support channel opened before arrival", "Post-trip review request within 48 hours"].map((standard) => (
            <div key={standard} className="rounded-2xl bg-[#f7f1e8] p-4 text-sm font-semibold leading-6 text-[#1b1b1b]">
              {standard}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ContentEditor({
  cms,
  search,
  filteredPages,
  isSaving,
  onSearch,
  onHero,
  onPage,
  onSave
}: {
  cms: AdminCmsState;
  search: string;
  filteredPages: AdminCmsState["pages"];
  isSaving: boolean;
  onSearch: (value: string) => void;
  onHero: (field: keyof AdminCmsState["hero"], value: string) => void;
  onPage: (slug: string, field: "title" | "description" | "status", value: string) => void;
  onSave: () => void;
}) {
  return (
    <div className="grid gap-6">
      <Panel title="Homepage Hero Controls" icon={Edit3}>
        <div className="grid gap-4 md:grid-cols-2">
          <TextField label="Headline" value={cms.hero.headline} onChange={(value) => onHero("headline", value)} />
          <TextField label="Subheadline" value={cms.hero.subheadline} onChange={(value) => onHero("subheadline", value)} />
          <TextField label="Primary CTA" value={cms.hero.primaryCta} onChange={(value) => onHero("primaryCta", value)} />
          <TextField label="Secondary CTA" value={cms.hero.secondaryCta} onChange={(value) => onHero("secondaryCta", value)} />
        </div>
      </Panel>

      <Panel title="Page Content Management" icon={FileText}>
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <label className="relative block md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71685c]" size={18} />
            <input
              value={search}
              onChange={(event) => onSearch(event.target.value)}
              className="w-full rounded-full border border-[#e7dccd] bg-[#f7f1e8] py-3 pl-11 pr-4 text-sm outline-none focus:border-[#c6922f]"
              placeholder="Search pages"
            />
          </label>
          <button type="button" onClick={onSave} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#10100f] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white">
            <Save size={17} />
            {isSaving ? "Saving..." : "Save Content"}
          </button>
        </div>
        <div className="grid gap-4">
          {filteredPages.map((page) => (
            <div key={page.slug} className="rounded-[1.25rem] border border-[#e7dccd] bg-[#f7f1e8] p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6922f]">/{page.slug}</p>
                <select
                  value={page.status}
                  onChange={(event) => onPage(page.slug, "status", event.target.value)}
                  className="rounded-full border border-[#e7dccd] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em]"
                >
                  <option>Live</option>
                  <option>Draft</option>
                </select>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
                <TextField label="Page Title" value={page.title} onChange={(value) => onPage(page.slug, "title", value)} />
                <TextField label="SEO / Hero Description" value={page.description} onChange={(value) => onPage(page.slug, "description", value)} />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function MediaLibrary({ media, onUpload }: { media: MediaAsset[]; onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Panel title="Upload Media" icon={CloudUpload}>
        <label className="flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-[#c6922f]/60 bg-[#f7f1e8] p-6 text-center transition hover:bg-white">
          <CloudUpload className="text-[#c6922f]" size={42} />
          <span className="mt-5 text-lg font-bold">Upload image or campaign file</span>
          <span className="mt-2 text-sm leading-6 text-[#71685c]">Accepted by the API up to 8MB. Assets are saved under public uploads for immediate preview.</span>
          <input type="file" accept="image/*,video/*,.pdf" onChange={onUpload} className="sr-only" />
        </label>
      </Panel>
      <Panel title="Media Library" icon={ImageIcon}>
        {media.length ? (
          <div className="grid gap-4 md:grid-cols-3">
            {media.map((asset) => (
              <div key={asset.id} className="overflow-hidden rounded-[1.25rem] border border-[#e7dccd] bg-[#f7f1e8]">
                <div className="relative aspect-[4/3] bg-[#10100f]">
                  {asset.type.startsWith("image/") ? (
                    <Image src={asset.url} alt={asset.name} fill sizes="(min-width: 768px) 24vw, 100vw" className="object-cover" />
                  ) : (
                    <div className="grid h-full place-items-center text-white">
                      <FileText size={36} />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="truncate text-sm font-bold">{asset.name}</p>
                  <p className="mt-2 text-xs text-[#71685c]">{Math.round(asset.size / 1024)} KB · {asset.type}</p>
                  <code className="mt-3 block truncate rounded-lg bg-white px-3 py-2 text-xs text-[#6b4a2e]">{asset.url}</code>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={ImageIcon} title="No media uploaded yet" copy="Upload safari, beach, hiking, event, transport, and brand campaign assets here." />
        )}
      </Panel>
    </div>
  );
}

function OffersEditor({
  cms,
  isSaving,
  onAddOffer,
  onOffer,
  onSave
}: {
  cms: AdminCmsState;
  isSaving: boolean;
  onAddOffer: () => void;
  onOffer: (id: string, field: keyof OfferPost, value: string) => void;
  onSave: () => void;
}) {
  return (
    <Panel title="Events, Offers & Campaign Posts" icon={CalendarDays}>
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-7 text-[#71685c]">Create seasonal safari offers, beach packages, hiking events, corporate retreat campaigns, and urgent WhatsApp promotions.</p>
        <div className="flex gap-2">
          <button type="button" onClick={onAddOffer} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#10100f]">
            <Plus size={17} /> New
          </button>
          <button type="button" onClick={onSave} className="inline-flex items-center gap-2 rounded-full bg-[#10100f] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white">
            <Save size={17} /> {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="grid gap-4">
        {cms.offers.map((offer) => (
          <div key={offer.id} className="grid gap-4 rounded-[1.25rem] border border-[#e7dccd] bg-[#f7f1e8] p-4 md:grid-cols-2">
            <TextField label="Post Title" value={offer.title} onChange={(value) => onOffer(offer.id, "title", value)} />
            <div className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">Status</span>
              <select value={offer.status} onChange={(event) => onOffer(offer.id, "status", event.target.value)} className="rounded-2xl border border-[#e7dccd] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#c6922f]">
                <option>Draft</option>
                <option>Published</option>
                <option>Scheduled</option>
              </select>
            </div>
            <div className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">Category</span>
              <select value={offer.category} onChange={(event) => onOffer(offer.id, "category", event.target.value)} className="rounded-2xl border border-[#e7dccd] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#c6922f]">
                {serviceNames.map((service) => (
                  <option key={service}>{service}</option>
                ))}
              </select>
            </div>
            <TextField label="Date" type="date" value={offer.date} onChange={(value) => onOffer(offer.id, "date", value)} />
            <TextField label="Price / Hook" value={offer.price} onChange={(value) => onOffer(offer.id, "price", value)} />
            <TextField label="Summary" value={offer.summary} onChange={(value) => onOffer(offer.id, "summary", value)} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function InquiriesTable({ inquiries }: { inquiries: InquiryRecord[] }) {
  return (
    <Panel title="Lead & Inquiry Inbox" icon={UsersRound}>
      {inquiries.length ? (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <article key={inquiry.id} className="rounded-[1.25rem] border border-[#e7dccd] bg-[#f7f1e8] p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c6922f]">{inquiry.id} · {new Date(inquiry.createdAt).toLocaleString()}</p>
                  <h3 className="mt-2 text-xl font-bold">{inquiry.name}</h3>
                  <p className="mt-1 text-sm text-[#71685c]">{inquiry.email}{inquiry.phone ? ` · ${inquiry.phone}` : ""}</p>
                </div>
                <span className="rounded-full bg-[#1f4d3a] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white">{inquiry.status}</span>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-[240px_1fr]">
                <div className="rounded-2xl bg-white p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">Journey</p>
                  <p className="mt-2 font-semibold">{inquiry.journey}</p>
                  {inquiry.date ? <p className="mt-2 text-sm text-[#71685c]">{inquiry.date}</p> : null}
                </div>
                <p className="rounded-2xl bg-white p-4 text-sm leading-7 text-[#1b1b1b]">{inquiry.message}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState icon={MessageSquareText} title="No inquiries yet" copy="Website inquiries will appear here after guests submit the public form." />
      )}
    </Panel>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof LayoutDashboard; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.5rem] bg-white p-5 shadow-sm md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#10100f] text-[#f4d68a]">
          <Icon size={19} />
        </span>
        <h2 className="font-display text-2xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TextField({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (value: string) => void; type?: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b4a2e]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-[#e7dccd] bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-[#c6922f]"
      />
    </label>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: typeof LayoutDashboard; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center justify-between rounded-2xl bg-[#f7f1e8] px-5 py-4 text-left text-sm font-bold text-[#10100f] transition hover:bg-[#eadfce]">
      <span className="inline-flex items-center gap-3">
        <Icon className="text-[#c6922f]" size={19} />
        {label}
      </span>
      <Plus size={16} />
    </button>
  );
}

function EmptyState({ icon: Icon, title, copy }: { icon: typeof LayoutDashboard; title: string; copy: string }) {
  return (
    <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-dashed border-[#d8c8b1] bg-[#f7f1e8] p-8 text-center">
      <div>
        <Icon className="mx-auto text-[#c6922f]" size={42} />
        <h3 className="mt-4 text-xl font-bold">{title}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-[#71685c]">{copy}</p>
      </div>
    </div>
  );
}
