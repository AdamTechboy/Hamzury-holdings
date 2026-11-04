'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react';
import { contactPrefs, stages, UNSURE, type EnquiryInput } from '@/lib/enquiry';
import { hours, links, ventures } from '@/lib/site';
import { submitEnquiry } from './actions';

const titles = [
  ['What can we help with?', 'Choose as many as you like. Not sure? That’s fine too.'],
  ['Where is your business today?', 'This helps us suggest the right starting point.'],
  ['Tell us about your business.', 'A few sentences is plenty. Plain words are best.'],
  ['How can we reach you?', 'We’ll use this only to reply to your enquiry.'],
];

export default function StartForm({ service, pkg }: { service?: string; pkg?: string }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EnquiryInput>({
    services: service && ventures.some((v) => v.id === service) ? [service] : [],
    package: pkg,
    stage: '',
    business: '',
    goal: '',
    name: '',
    email: '',
    phone: '',
    contactPref: 'whatsapp',
    consent: false,
    website: '',
  });
  const [error, setError] = useState('');
  const [reference, setReference] = useState('');
  const [pending, startTransition] = useTransition();
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus();
    window.scrollTo({ top: 0 });
  }, [step, reference]);

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setError('');
    setData((d) => ({ ...d, [key]: value }));
  };

  const toggleService = (id: string) =>
    set(
      'services',
      id === UNSURE
        ? [UNSURE]
        : data.services.includes(id)
          ? data.services.filter((s) => s !== id)
          : [...data.services.filter((s) => s !== UNSURE), id],
    );

  const canContinue = [
    data.services.length > 0,
    data.stage !== '',
    data.business.trim() !== '' && data.goal.trim().length >= 10,
    data.name.trim() !== '' &&
      data.consent &&
      (data.contactPref === 'email' ? data.email.trim() : data.phone.trim()) !== '',
  ][step];

  const next = (e: FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    if (step < titles.length - 1) return setStep(step + 1);
    startTransition(async () => {
      const result = await submitEnquiry({ ...data, source: document.referrer || undefined });
      if (result.ok) setReference(result.reference);
      else setError(result.error);
    });
  };

  if (reference) {
    return (
      <div className="done">
        <div className="done-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h1 ref={heading} tabIndex={-1}>
          Thank you, {data.name.split(' ')[0]}.
        </h1>
        <p className="lead">
          We’ve received your enquiry. Our team will review your answers and contact you by{' '}
          {contactPrefs.find((c) => c.id === data.contactPref)?.label.toLowerCase()} during working
          hours ({hours}).
        </p>
        <div className="reference">
          <span className="small">Your reference</span>
          <b>{reference}</b>
        </div>
        <p className="small" style={{ marginTop: 12 }}>
          Keep this handy in case you need to contact us.
        </p>
        <div className="actions center">
          <Link className="btn" href="/services">
            Explore our services
          </Link>
          <Link className="link" href="/">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const [title, lead] = titles[step];

  return (
    <form className="question" onSubmit={next} noValidate>
      <div className="progress" aria-label={`Step ${step + 1} of ${titles.length}`}>
        <span>
          {step + 1} of {titles.length}
        </span>
        <div className="progress-bar">
          <i style={{ width: `${((step + 1) / titles.length) * 100}%` }} />
        </div>
      </div>

      <h1 ref={heading} tabIndex={-1}>
        {title}
      </h1>
      <p className="lead">{lead}</p>

      <div className="question-body" key={step}>
        {step === 0 && (
          <div className="choices" role="group" aria-label="Areas you need help with">
            {[
              ...ventures.map((v) => ({ id: v.id, label: v.category, hint: v.name })),
              { id: UNSURE, label: 'Not sure yet', hint: 'Help me work it out' },
            ].map((o) => (
              <label className="choice" key={o.id}>
                <input
                  type="checkbox"
                  checked={data.services.includes(o.id)}
                  onChange={() => toggleService(o.id)}
                />
                <b>{o.label}</b>
                <span>{o.hint}</span>
              </label>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="choices" role="radiogroup" aria-label="Business stage">
            {stages.map((s) => (
              <label className="choice radio" key={s.id}>
                <input
                  type="radio"
                  name="stage"
                  checked={data.stage === s.id}
                  onChange={() => set('stage', s.id)}
                />
                <b>{s.label}</b>
                <span>{s.hint}</span>
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <>
            <label className="field">
              <span>Business or organisation name</span>
              <input
                value={data.business}
                onChange={(e) => set('business', e.target.value)}
                autoComplete="organization"
                maxLength={120}
                autoFocus
              />
            </label>
            <label className="field">
              <span>
                What would you like to achieve? <small>(at least a sentence)</small>
              </span>
              <textarea
                value={data.goal}
                onChange={(e) => set('goal', e.target.value)}
                maxLength={2000}
                placeholder="For example: we sell catering services and want to register properly, look more professional and get more corporate clients."
              />
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <label className="field">
              <span>Your name</span>
              <input
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
                autoComplete="name"
                maxLength={120}
                autoFocus
              />
            </label>
            <div className="field">
              <span>Best way to reach you</span>
              <div
                className="choices"
                role="radiogroup"
                aria-label="Contact method"
                style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
              >
                {contactPrefs.map((c) => (
                  <label className="choice radio" key={c.id}>
                    <input
                      type="radio"
                      name="contactPref"
                      checked={data.contactPref === c.id}
                      onChange={() => set('contactPref', c.id)}
                    />
                    <b>{c.label}</b>
                  </label>
                ))}
              </div>
            </div>
            <div className="row-2">
              <label className="field">
                <span>Phone {data.contactPref === 'email' && <small>(optional)</small>}</span>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  autoComplete="tel"
                  placeholder="+234 …"
                  maxLength={30}
                />
              </label>
              <label className="field">
                <span>Email {data.contactPref !== 'email' && <small>(optional)</small>}</span>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => set('email', e.target.value)}
                  autoComplete="email"
                  maxLength={200}
                />
              </label>
            </div>
            <label className="hp" aria-hidden="true">
              Website
              <input
                tabIndex={-1}
                autoComplete="off"
                value={data.website}
                onChange={(e) => set('website', e.target.value)}
              />
            </label>
            <label className="consent">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set('consent', e.target.checked)}
              />
              I agree that Hamzury may contact me about this enquiry.
            </label>
          </>
        )}
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}{' '}
          {error.includes('contact desk') && (
            <a href={links.desk} target="_blank" rel="noopener">
              Open contact desk ↗
            </a>
          )}
        </p>
      )}

      <div className="form-nav">
        {step > 0 ? (
          <button type="button" className="btn-back" onClick={() => setStep(step - 1)}>
            ‹ Back
          </button>
        ) : (
          <span />
        )}
        <button className="btn" type="submit" disabled={!canContinue || pending}>
          {pending ? 'Sending…' : step === titles.length - 1 ? 'Send enquiry' : 'Continue'}
        </button>
      </div>
    </form>
  );
}
