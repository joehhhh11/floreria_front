import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react"; // ✅ usar Clerk aquí
import httpClient from "../../api/httpClient"; // tu cliente Axios

function Reviews() {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const { isSignedIn } = useUser(); // ✅ usar Clerk para saber si está logueado

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await httpClient.get(`/api/reviews/product/${id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error al cargar reseñas", err);
      }
    };

    fetchReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await httpClient.post("/api/reviews", {
        productoId: Number(id),
        comentario: newComment,
        puntuacion: rating,
      });

      setReviews((prev) => [...prev, res.data]);
      setNewComment("");
      setRating(0);
    } catch (err) {
      console.error("Error al enviar reseña:", err);
      alert("Error al enviar reseña");
    }
  };

  return (
    <div className="p-6 border-t mt-10">
      <h2 className="text-xl font-bold mb-4">Reseñas</h2>

      {reviews.length === 0 ? (
        <p>No hay reseñas aún.</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 border-b pb-2">
            <p className="font-semibold">Puntuación: {review.puntuacion} ⭐</p>
            <p>{review.comentario}</p>
          </div>
        ))
      )}

      {isSignedIn ? (
        <form onSubmit={handleSubmit} className="mt-6">
          <h3 className="font-semibold mb-2">Escribe tu reseña</h3>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min={1}
            max={5}
            required
            className="w-20 border p-1 mb-2"
            placeholder="Punt."
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full border p-2 mb-2"
            placeholder="Comentario..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Enviar reseña
          </button>
        </form>
      ) : (
        <p className="mt-4 text-sm text-gray-500 italic">
          Inicia sesión para dejar una reseña.
        </p>
      )}
    </div>
  );
}

export default Reviews;
