import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import httpClient from "../../api/httpClient";
import {
  StarIcon,
  UserCircleIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleLeftIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolid, UserIcon } from '@heroicons/react/24/solid';

function Reviews({ data = [] }) {
  const { id } = useParams();
  const [reviews, setReviews] = useState(data);
  const [formVisible, setFormVisible] = useState(false);
  const [newReview, setNewReview] = useState({ puntuacion: 5, comentario: "" });
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  const { isSignedIn, user } = useUser();

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

  const handleInputChange = (field, value) => {
    setNewReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comentario.trim()) return;

    try {
      const res = await httpClient.post("/api/reviews", {
        productoId: Number(id),
        comentario: newReview.comentario,
        puntuacion: newReview.puntuacion,
      });

      setReviews((prev) => [res.data, ...prev]);
      setNewReview({ puntuacion: 5, comentario: "" });
      setFormVisible(false);
    } catch (err) {
      console.error("Error al enviar reseña:", err);
      alert("No se pudo enviar la reseña");
    }
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.puntuacion, 0) / totalReviews 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.puntuacion === rating).length,
    percentage: totalReviews > 0 
      ? (reviews.filter(review => review.puntuacion === rating).length / totalReviews) * 100 
      : 0
  }));

  const filteredAndSortedReviews = reviews
    .filter(review => {
      if (filterBy === 'all') return true;
      return review.puntuacion === parseInt(filterBy);
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.fechaReview) - new Date(a.fechaReview);
      if (sortBy === 'rating-high') return b.puntuacion - a.puntuacion;
      if (sortBy === 'rating-low') return a.puntuacion - b.puntuacion;
      return 0;
    });

  const renderStars = (rating, interactive = false, size = 'w-5 h-5') => {
    return [...Array(5)].map((_, i) => {
      if (interactive) {
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleInputChange("puntuacion", i + 1)}
            className="focus:outline-none hover:scale-110 transition-transform"
          >
            {i < newReview.puntuacion ? (
              <StarSolid className={`${size} text-yellow-400 hover:text-yellow-500`} />
            ) : (
              <StarIcon className={`${size} text-gray-300 hover:text-yellow-300`} />
            )}
          </button>
        );
      }
      
      return i < rating ? (
        <StarSolid key={i} className={`${size} text-yellow-400`} />
      ) : (
        <StarIcon key={i} className={`${size} text-gray-300`} />
      );
    });
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reseñas y valoraciones</h2>
        <p className="text-gray-600">{totalReviews} reseña{totalReviews !== 1 ? "s" : ""}</p>
      </div>

      <div className="p-8">
        {totalReviews > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-3">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-3">
                {renderStars(Math.round(averageRating), false, 'w-6 h-6')}
              </div>
              <p className="text-gray-600 font-medium">Calificación promedio</p>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 min-w-[70px]">
                    <span className="text-sm font-medium">{rating}</span>
                    <StarSolid className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 min-w-[35px] text-right font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="recent">Más recientes</option>
              <option value="rating-high">Mejor calificadas</option>
              <option value="rating-low">Menor calificadas</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="all">Todas las reseñas</option>
              <option value="5">5 estrellas</option>
              <option value="4">4 estrellas</option>
              <option value="3">3 estrellas</option>
              <option value="2">2 estrellas</option>
              <option value="1">1 estrella</option>
            </select>
          </div>

          {isSignedIn && (
            <button
              onClick={() => setFormVisible(!formVisible)}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md"
            >
              <PlusIcon className="w-5 h-5" />
              Escribir reseña
            </button>
          )}
        </div>

        {formVisible && (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border-2 border-blue-100 shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Escribir una reseña</h3>
              <button
                onClick={() => setFormVisible(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tu calificación
                </label>
                <div className="flex gap-2">
                  {renderStars(0, true, 'w-10 h-10')}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {newReview.puntuacion} de 5 estrella{newReview.puntuacion !== 1 ? 's' : ''}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tu reseña
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white shadow-sm"
                  rows={5}
                  value={newReview.comentario}
                  onChange={(e) => handleInputChange("comentario", e.target.value)}
                  placeholder="Comparte tu experiencia con este producto. ¿Qué te gustó más? ¿Lo recomendarías?"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">{newReview.comentario.length} caracteres</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!newReview.comentario.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Publicar reseña
                </button>
                <button
                  type="button"
                  onClick={() => setFormVisible(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {filteredAndSortedReviews.length > 0 ? (
          <div className="space-y-6">
            {filteredAndSortedReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex">
                          {renderStars(review.puntuacion, false, 'w-5 h-5')}
                        </div>
                        <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full">
                          {formatDate(review.fechaReview)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <p className="text-gray-800 leading-relaxed">{review.comentario}</p>
                    </div>

                    <div className="flex items-center gap-6 mt-4">
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors group">
                        <HandThumbUpIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Útil</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors group">
                        <ChatBubbleLeftIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Responder</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <StarIcon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-3">
              {filterBy === 'all' ? 'Aún no hay reseñas' : 'No hay reseñas que coincidan'}
            </h3>
            <p className="text-gray-500 mb-6">
              {filterBy === 'all' 
                ? '¡Sé el primero en compartir tu experiencia con este producto!' 
                : 'Intenta cambiar los filtros para ver más reseñas.'
              }
            </p>
            {isSignedIn && filterBy === 'all' && (
              <button
                onClick={() => setFormVisible(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Escribir la primera reseña
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviews;