import Seo from '../components/common/Seo';
import PageBanner from '../components/common/PageBanner';
import { brand, contact } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

// DUMMY policy text: have it reviewed before going live.
const content = {
  privacy: {
    title: 'Privacy Policy',
    intro: `${brand.name} respects your privacy. This policy explains what information we collect through this website and how we use it.`,
    sections: [
      ['Information we collect', 'This website does not have accounts, a shopping cart or online payments. When you send an enquiry, the details you type (name, phone number, email and message) are passed to WhatsApp so you can send them to us yourself.'],
      ['How we use it', 'We use your details only to reply to your enquiry, share saree photos or videos you ask for, and arrange in-store visits or deliveries. We never sell or rent your information.'],
      ['Third-party services', 'This website links to WhatsApp, Instagram, YouTube and Google Maps. Our YouTube reels (in privacy-enhanced mode) and the store map load from YouTube and Google only after you press play or choose to show the map. Those services have their own privacy policies, which apply when you use them.'],
      ['Cookies', 'This website does not use advertising or tracking cookies.'],
      ['Contact', `For any privacy question, email ${contact.email} or call ${contact.phoneDisplay}.`],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: `By using this website you agree to the following terms. This website is a showcase of the ${brand.name} collection.`,
    sections: [
      ['Product information', 'We try to show every saree as accurately as possible. Colours can look slightly different because of lighting and screen settings, and handwoven sarees may have small irregularities that are part of their character.'],
      ['Prices & availability', 'Prices on this website are indicative and may change without notice. Availability is confirmed only when you speak to us on WhatsApp, by phone or in store.'],
      ['Orders', 'Purchases are made directly with our team in store or over WhatsApp. Payment, delivery, exchange and return terms are shared with you before any order is confirmed.'],
      ['Intellectual property', `Our product photographs and content belong to ${brand.name}. Lifestyle photographs are used under their respective free licences.`],
      ['Governing law', 'These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts of Thane, Maharashtra.'],
    ],
  },
};

export default function Legal({ type }) {
  const { t } = useLanguage();
  const loc = useLocalized();
  const key = content[type] ? type : 'privacy';
  const page = loc.legal(key, content[key]);
  return (
    <>
      <Seo title={page.title} description={page.intro} />
      <PageBanner title={page.title} crumbs={[{ label: page.title }]} />
      <section className="section">
        <div className="container container--narrow legal">
          <p className="legal__updated">{t('legal.updated')}</p>
          <p className="legal__intro">{page.intro}</p>
          {page.sections.map(([h, p], i) => (
            <section key={i} className="legal__section">
              <h2>{h}</h2>
              <p>{p}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
