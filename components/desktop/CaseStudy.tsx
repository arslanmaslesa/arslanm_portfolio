import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { CaseStudy, CaseStudyImage, CaseStudyModule } from '../../content/work';

type Props = {
  caseStudy: CaseStudy;
};

function InfoList({ items }: { items: Array<{ label: string; value: string }> }) {
  return (
    <dl className="grid gap-y-5 text-base">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-6">
          <dt className="font-medium text-slate-950">{item.label}</dt>
          <dd className="text-right text-slate-950">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Device({ image, alt }: { image: string; alt: string }) {
  return (
    <div className="my-10 flex justify-center sm:my-20">
      <Image
        className="h-auto w-full max-w-[620px] rounded-[8px] shadow-[0_18px_35px_rgba(15,23,42,0.16),0_4px_10px_rgba(15,23,42,0.08)] sm:rounded-[16px]"
        src={image}
        alt={alt}
        width={1240}
        height={720}
      />
    </div>
  );
}

function Narrative({ label, text }: { label: string; text: string }) {
  return (
    <section className="my-10 grid gap-3 sm:my-20 sm:grid-cols-2">
      <h3 className="font-semibold tracking-[-0.02em] text-slate-950">{label}</h3>
      <p className="leading-6 text-slate-700 sm:text-base sm:leading-7">{text}</p>
    </section>
  );
}

function GridImage({ image }: { image: CaseStudyImage }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f3f3f3]">
      <Image
        className="h-full w-full object-contain"
        src={image.src}
        alt={image.alt}
        width={image.width ?? 900}
        height={image.height ?? 900}
      />
    </div>
  );
}

function ImageGrid({ rows }: Extract<CaseStudyModule, { type: 'image-grid' }>) {
  return (
    <section className="my-8 space-y-3 sm:my-12">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 gap-3 sm:grid-cols-[repeat(var(--case-study-grid-columns),minmax(0,1fr))]"
          style={{ '--case-study-grid-columns': row.columns.length } as CSSProperties}
        >
          {row.columns.map((image) => <GridImage key={image.src} image={image} />)}
        </div>
      ))}
    </section>
  );
}

function CaseStudyModuleView({ module }: { module: CaseStudyModule }) {
  switch (module.type) {
    case 'intro':
      return (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-3">
          <h2 className="w-full font-semibold leading-7 tracking-[-0.01em] text-[20px] text-slate-950 sm:w-[200px]">
            {module.title}
          </h2>
          <div>
            <p className="text-slate-700 text-base sm:leading-7">{module.description}</p>
            <div className="mt-15"><InfoList items={module.info} /></div>
          </div>
        </section>
      );
    case 'device':
      return <Device image={module.image} alt={module.alt} />;
    case 'narrative':
      return <Narrative label={module.label} text={module.text} />;
    case 'image-grid':
      return <ImageGrid {...module} />;
  }
}

export function CaseStudyView({ caseStudy }: Props) {
  return (
    <article className="w-full px-5 py-8 sm:px-21 sm:py-10">
      {caseStudy.modules.map((module, index) => <CaseStudyModuleView key={index} module={module} />)}
    </article>
  );
}
