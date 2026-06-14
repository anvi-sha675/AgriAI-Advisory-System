function Card({ title, description }) {
  return (
    <div className="border rounded-xl p-6 shadow hover:shadow-lg transition">
      <h2 className="text-2xl font-semibold mb-3">
        {title}
      </h2>

      <p>{description}</p>
    </div>
  );
}

export default Card;