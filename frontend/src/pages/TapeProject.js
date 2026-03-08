function TapeProject() {
  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <video
        src="https://pub-5068b0365d4041728402559c74ff3c00.r2.dev/tape.mp4"
        controls
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'block',
        }}
      />
    </div>
  );
}

export default TapeProject;
