const features = [
  { id: 1, title: "Fast", text: "Add tasks in seconds." },
  { id: 2, title: "Filters", text: "See only what matters." },
  { id: 3, title: "Saved", text: "Your tasks stay after refresh." },
];

function Features() {
  return (
    <section id="features" className="section">
      <h2>Features</h2>
      <div className="features-grid">
        {features.map((f) => (
          <div className="card" key={f.id}>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;