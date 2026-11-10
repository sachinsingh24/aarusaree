import { useRef, useState } from 'react';
import Seo from '../components/common/Seo';
import Icon from '../components/common/Icon';
import PageBanner from '../components/common/PageBanner';
import SectionHeading from '../components/common/SectionHeading';
import FaqSection from '../components/common/FaqSection';
import { contact, social, whatsappLink, addressParts } from '../data/site';
import { lifestyleImage, siteImages } from '../data/images';
import { useLanguage } from '../i18n/LanguageContext';
import { useLocalized } from '../i18n/useLocalized';

const EMPTY = { name: '', phone: '', email: '', interest: '', message: '' };

/** Returns error message keys (translated at render time, so errors follow a language switch). */
function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'contact.errName';
  const digits = values.phone.replace(/[\s()-]/g, '').replace(/^(\+91|0091|91|0)(?=\d{10}$)/, '');
  if (!values.phone.trim()) errors.phone = 'contact.errPhoneRequired';
  else if (!/^[6-9]\d{9}$/.test(digits)) errors.phone = 'contact.errPhone';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'contact.errEmail';
  if (values.message.trim().length < 10) errors.message = 'contact.errMessage';
  return errors;
}

function Field({ id, label, error, required, hint, optionalLabel, children }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label} {required ? <span aria-hidden="true">*</span> : <span className="field__optional">{optionalLabel}</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const loc = useLocalized();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [sentLink, setSentLink] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const formRef = useRef(null);

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched[e.target.name]) setErrors(validate(next));
  };
  const onBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(found).length) {
      const first = formRef.current?.querySelector(`[name="${Object.keys(found)[0]}"]`);
      first?.focus();
      return;
    }
    const interest = loc.collection(values.interest)?.title ?? t('contact.notSure');
    const text = [
      t('wa.enquiryHello'),
      `${t('wa.name')}: ${values.name.trim()}`,
      `${t('wa.phone')}: ${values.phone.trim()}`,
      values.email.trim() && `${t('wa.email')}: ${values.email.trim()}`,
      `${t('wa.interest')}: ${interest}`,
      `${t('wa.message')}: ${values.message.trim()}`,
    ]
      .filter(Boolean)
      .join('\n');
    const link = whatsappLink(text);
    window.open(link, '_blank', 'noopener,noreferrer');
    setSentLink(link);
    setValues(EMPTY);
    setTouched({});
    setErrors({});
  };

  const describedBy = (name, hint) => (errors[name] && touched[name] ? `${name}-error` : hint ? `${name}-hint` : undefined);
  const showError = (name) => (touched[name] && errors[name] ? t(errors[name]) : undefined);
  const optional = t('contact.optional');

  return (
    <>
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDescription', { phone: contact.phoneDisplay })} />
      <PageBanner
        title={t('contact.bannerTitle')}
        eyebrow={t('contact.bannerEyebrow')}
        text={t('contact.bannerText')}
        image={lifestyleImage(siteImages.contactBanner)}
        imageAlt={t('alt.contactBanner')}
        crumbs={[{ label: t('nav.contact') }]}
        position="center 30%"
      />

      <section className="section" aria-label={t('contact.sectionLabel')}>
        <div className="container contact-grid">
          <div className="contact-info">
            <SectionHeading eyebrow={t('contact.infoEyebrow')} title={t('contact.infoTitle')} align="left" />
            <ul className="contact-cards">
              <li className="contact-card">
                <span className="contact-card__icon">
                  <Icon name="map" size={22} />
                </span>
                <div>
                  <h3>{t('contact.address')}</h3>
                  <p>
                    {addressParts().map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="text-link">
                    {t('contact.directions')} <Icon name="arrowRight" size={16} />
                  </a>
                </div>
              </li>
              <li className="contact-card">
                <span className="contact-card__icon">
                  <Icon name="phone" size={22} />
                </span>
                <div>
                  <h3>{t('contact.phone')}</h3>
                  <p>
                    <a href={contact.phoneLink}>{contact.phoneDisplay}</a>
                  </p>
                </div>
              </li>
              <li className="contact-card">
                <span className="contact-card__icon">
                  <Icon name="mail" size={22} />
                </span>
                <div>
                  <h3>{t('contact.email')}</h3>
                  <p>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </p>
                </div>
              </li>
              <li className="contact-card">
                <span className="contact-card__icon">
                  <Icon name="clock" size={22} />
                </span>
                <div>
                  <h3>{t('contact.hours')}</h3>
                  {loc.hours.map((h) => (
                    <p key={h.days}>
                      {h.days}: {h.time}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
            <a href={whatsappLink(t('wa.default'))} className="btn btn--whatsapp btn--lg btn--block" target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={20} /> {t('common.chatWithUs')}
            </a>
            <ul className="social-list social-list--dark" aria-label={t('common.socialMedia')}>
              {social.map((s) => (
                <li key={s.name}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${s.name}: ${s.handle}`} className="social-list__link">
                    <Icon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="contact-form-wrap">
            {sentLink ? (
              <div className="form-success" role="status">
                <span className="form-success__icon">
                  <Icon name="check" size={30} strokeWidth={2} />
                </span>
                <h2>{t('contact.successTitle')}</h2>
                <p>{t('contact.successText')}</p>
                <p className="form-success__small">
                  {t('contact.successNoOpen')}{' '}
                  <a href={sentLink} target="_blank" rel="noopener noreferrer">
                    {t('contact.successOpenHere')}
                  </a>{' '}
                  {t('contact.successOrCall')} <a href={contact.phoneLink}>{contact.phoneDisplay}</a>.
                </p>
                <button type="button" className="btn btn--outline" onClick={() => setSentLink(null)}>
                  {t('contact.another')}
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate ref={formRef} aria-labelledby="form-title">
                <h2 id="form-title" className="contact-form__title">
                  {t('contact.formTitle')}
                </h2>
                <p className="contact-form__intro">{t('contact.formIntro')}</p>
                <div className="contact-form__row">
                  <Field id="name" label={t('contact.name')} required error={showError('name')}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={!!showError('name')}
                      aria-describedby={describedBy('name')}
                      required
                    />
                  </Field>
                  <Field id="phone" label={t('contact.phoneField')} required error={showError('phone')} hint={t('contact.phoneHint')}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={!!showError('phone')}
                      aria-describedby={describedBy('phone', true)}
                      required
                    />
                  </Field>
                </div>
                <div className="contact-form__row">
                  <Field id="email" label={t('contact.emailField')} error={showError('email')} optionalLabel={optional}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      aria-invalid={!!showError('email')}
                      aria-describedby={describedBy('email')}
                    />
                  </Field>
                  <Field id="interest" label={t('contact.interest')} optionalLabel={optional}>
                    <select id="interest" name="interest" value={values.interest} onChange={onChange}>
                      <option value="">{t('contact.notSure')}</option>
                      {loc.collections.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field id="message" label={t('contact.message')} required error={showError('message')}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={onChange}
                    onBlur={onBlur}
                    aria-invalid={!!showError('message')}
                    aria-describedby={describedBy('message')}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                  />
                </Field>
                <p className="contact-form__note">
                  <span aria-hidden="true">*</span> {t('contact.required')}
                </p>
                <button type="submit" className="btn btn--primary btn--lg">
                  <Icon name="whatsapp" size={20} /> {t('contact.submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <FaqSection id="contact-faq-title" />

      <section className="map-section" aria-label={t('contact.mapLabel')}>
        {showMap ? (
          <iframe title={t('contact.mapTitle')} src={contact.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          // Google Maps sets cookies, so the map only loads once the visitor asks for it.
          <div className="map-placeholder">
            <span className="map-placeholder__icon" aria-hidden="true">
              <Icon name="map" size={30} />
            </span>
            <p className="map-placeholder__address">
              {addressParts().join(', ')}
            </p>
            <div className="map-placeholder__actions">
              <button type="button" className="btn btn--primary" onClick={() => setShowMap(true)}>
                {t('contact.mapShow')}
              </button>
              <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                {t('contact.mapOpen')} <Icon name="arrowRight" size={18} />
              </a>
            </div>
            <p className="map-placeholder__notice">{t('contact.mapNotice')}</p>
          </div>
        )}
      </section>
    </>
  );
}
