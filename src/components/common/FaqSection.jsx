import Accordion from './Accordion';
import Icon from './Icon';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { whatsappLink } from '../../data/site';
import { useLanguage } from '../../i18n/LanguageContext';

/** Frequently asked questions (text lives in src/i18n/ui/*.js → faq.items). */
export default function FaqSection({ id = 'faq-title', className = '' }) {
  const { t } = useLanguage();
  const items = t('faq.items');
  const list = Array.isArray(items) ? items : [];

  return (
    <section className={`section faq ${className}`} aria-labelledby={id}>
      <div className="container faq__grid">
        <div className="faq__intro">
          <SectionHeading eyebrow={t('faq.eyebrow')} title={t('faq.title')} intro={t('faq.intro')} align="left" id={id} />
          <a href={whatsappLink(t('wa.default'))} className="btn btn--whatsapp" target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={18} /> {t('common.chatWhatsapp')}
          </a>
        </div>
        <Reveal>
          <Accordion
            defaultOpen="faq-0"
            items={list.map((item, i) => ({ id: `faq-${i}`, title: item.q, content: <p>{item.a}</p> }))}
          />
        </Reveal>
      </div>
    </section>
  );
}
