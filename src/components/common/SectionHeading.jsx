import Ornament from './Ornament';

/** Eyebrow + serif heading + optional intro, with the zari ornament. */
export default function SectionHeading({ eyebrow, title, intro, align = 'center', as: Tag = 'h2', light = false, id }) {
  return (
    <header className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className="section-heading__title" id={id}>
        {title}
      </Tag>
      <Ornament className="section-heading__ornament" />
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  );
}
