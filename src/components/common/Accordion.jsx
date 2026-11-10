import { useId, useState } from 'react';

/**
 * Accessible accordion. items: [{ id, title, content }]
 * One panel open at a time (opening another closes the previous); panels animate their height.
 */
export default function Accordion({ items, defaultOpen = null, className = '', headingLevel = 3 }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const Heading = `h${headingLevel}`;

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const buttonId = `${uid}-btn-${item.id}`;
        const panelId = `${uid}-panel-${item.id}`;
        return (
          <div key={item.id} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
            <Heading className="accordion__heading">
              <button
                type="button"
                id={buttonId}
                className="accordion__button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{item.title}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="accordion__panel" inert={!isOpen ? true : undefined}>
              <div className="accordion__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
