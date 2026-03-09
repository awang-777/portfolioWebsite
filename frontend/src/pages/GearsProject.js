function GearsProject() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px)',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: '680px', textAlign: 'left' }}>
        <p style={{ fontFamily: 'Moralana, serif', fontSize: '18px', color: '#3a3a3a', marginBottom: '8px', letterSpacing: '0.05em' }}>
          Augment, 2026
        </p>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', color: '#999999', letterSpacing: '0.12em', marginBottom: '28px' }}>
          Real-time body tracking, TouchDesigner, Blender
        </p>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '13px', lineHeight: '2', color: '#5a5a5a', letterSpacing: '0.05em' }}>
          The body as interface — Augment explores the connection between flesh and machine, physical and virtual, through gesture-controlled mechanical adornments. Hand movements tracked via MediaPipe control a living exoskeleton of gears and ornaments rendered in real time.
        </p>
      </div>

      {/* Video */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        marginTop: 'clamp(24px, 4vw, 48px)',
      }}>
        <video
          src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/gears1.mp4"
          controls
          playsInline
          style={{ width: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}

export default GearsProject;
