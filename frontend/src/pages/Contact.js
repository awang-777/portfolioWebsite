import { useState } from 'react';
import './Contact.css';

// Messages are delivered by Formspree (formspree.io). Create a free form there and paste
// its ID here (the part after /f/ in the form's endpoint, e.g. "xyzabcde")
const FORMSPREE_ID = 'xwllzjkn';

const EMAIL = 'amndaawang@gmail.com';

// Rendered as a section of the home page
function Contact() {
  // idle | sending | sent | error
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!FORMSPREE_ID) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error('Contact form failed:', err);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact-section">
      <p className="home-label">contact</p>

      <div className="contact-body">
        <p className="contact-intro">
          For commissions, collaborations, or anything else, send a message below or email{' '}
          <a href={`mailto:${EMAIL}`} className="contact-inline-link">{EMAIL}</a>.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Hidden from people; bots that fill it in are dropped by Formspree */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="contact-honeypot" />

          <div className="contact-row">
            <label className="contact-field">
              <span>name</span>
              <input type="text" name="name" required />
            </label>
            <label className="contact-field">
              <span>email</span>
              <input type="email" name="email" required />
            </label>
          </div>

          <label className="contact-field">
            <span>message</span>
            <textarea name="message" rows="4" required />
          </label>

          <div className="contact-footer">
            <button type="submit" className="contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'sending…' : 'send message →'}
            </button>
            {status === 'sent' && <p className="contact-status">thank you, i'll be in touch soon.</p>}
            {status === 'error' && (
              <p className="contact-status">
                something went wrong. please email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> instead.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
