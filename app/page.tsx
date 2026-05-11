export default function HomePage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const res = await fetch("/api/lead", {
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        phone: data.get("phone"),
        city: data.get("city"),
        serviceNeeded: data.get("serviceNeeded"),
        source: "hydra-home"
      }),
      headers: { "Content-Type": "application/json" }
    });
    if (res.ok) {
      alert("Thanks! Your request was received.");
      form.reset();
    } else {
      alert("Something went wrong. Try again.");
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "2rem" }}>
      <h1>Local Services & AI Deals – Hydra Hybrid Hub</h1>
      <p>
        One simple form. We match you with either a local provider or a curated AI/online offer
        that fits what you need.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" required />
        </label>
        <br />
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <br />
        <label>
          Phone
          <input name="phone" />
        </label>
        <br />
        <label>
          City
          <input name="city" />
        </label>
        <br />
        <label>
          What do you need?
          <select name="serviceNeeded" required>
            <option value="">Select one</option>
            <option value="junk-removal">Junk removal</option>
            <option value="pressure-washing">Pressure washing</option>
            <option value="tree-removal">Tree removal</option>
            <option value="ai-tools">AI tools / software</option>
            <option value="other">Something else</option>
          </select>
        </label>
        <br />
        <button type="submit">Get matched</button>
      </form>

      <p style={{ fontSize: "0.8rem", marginTop: "1rem" }}>
        We may earn a commission from some recommendations. No extra cost to you.
      </p>
    </main>
  );
}
