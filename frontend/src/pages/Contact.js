function Contact() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      backgroundColor: '#f2f0ef',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <a
          href="https://www.instagram.com/m3ii.22"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#5a5a5a', padding: '0 8px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
          </svg>
        </a>

        <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: '#c8c8c2' }} />

        <div style={{
          fontFamily: 'Georgia, serif',
          color: '#3a3a3a',
          textAlign: 'left',
          lineHeight: '2',
          fontSize: 'clamp(12px, 1.8vw, 15px)',
          letterSpacing: '0.05em',
          maxWidth: '480px',
          padding: '0 24px',
        }}>
          <p>Hello :)</p>
          <p style={{ marginTop: '1.2em', color: '#5a5a5a' }}>
            For all inquiries regarding commissions, collaborative projects, partnerships, or anything else — please reach out using the email below.
          </p>
          <p style={{ marginTop: '1.2em', letterSpacing: '0.1em' }}>amndaawang@gmail.com</p>
          <p style={{ marginTop: '1.2em', color: '#5a5a5a' }}>I look forward to hearing from you!</p>
          <p style={{ marginTop: '0.4em', color: '#5a5a5a' }}>Best,<br />Amanda</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
