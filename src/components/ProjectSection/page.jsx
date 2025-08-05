"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { API } from '@/lib/data-service';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function ProjectSection() {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchProjectsTitles();
  }, []);

  useEffect(() => {
    if (selectedTitle) {
      fetchGalleryByProjectId();
    }
  }, [selectedTitle]);

  const fetchGalleryByProjectId = async () => {
    setGalleryLoading(true);
    try {
      const response = await axios.get(`${API}/api/projects/${selectedTitle}`);
      setGallery(response.data.gallery || []);
    } catch (err) {
      console.error("Error fetching project gallery:", err);
      toast.error("Failed to load project Gallery");
    } finally {
      setGalleryLoading(false);
    }
  };

  const fetchProjectsTitles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API}/api/projects/get-all-titles`);
      setTitles(response.data.title || []);

      if (response.data.title?.length > 0) {
        setSelectedTitle(response.data.title[0]._id);
      }
    } catch (error) {
      console.error("Error fetching project titles:", error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setCurrentIndex(prev => {
      const newIndex = prev + 5;
      return newIndex >= titles.length ? 0 : newIndex;
    });
  };

  const handleTitleClick = (titleId) => {
    setSelectedTitle(titleId);
  };

  const visibleTitles = titles.slice(currentIndex, currentIndex + 5);
  const remainingTitles = titles.length - (currentIndex + 5);

  return (
    <>
      <section className="project-section">
        <div className="auto-container">
          <div className="sec-title h2 centred" style={{ marginBottom: 20 }}>
            <h2>
              Our Recent Projects
              <br />
              Gallery
            </h2>
          </div>

          {/* Project Titles Row */}
          <div className="border w-full p-4 mb-4 rounded-lg shadow-sm bg-white">
            {loading ? (
              <div className="flex justify-center items-center w-full py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Loading projects...</span>
              </div>
            ) : (
              <>
                {titles.length === 0 ? (
                  <div className="flex justify-center items-center w-full py-6">
                    <span className="text-gray-500 text-lg font-medium">
                      No projects available yet
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-center gap-8 w-[80%] m-auto">
                    {visibleTitles.map((project) => (
                      <div
                        key={project._id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                ${selectedTitle === project._id
                            ? 'bg-green-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-800 hover:bg-blue-100 hover:text-green-600'
                          }`}
                        onClick={() => handleTitleClick(project._id)}
                      >
                        {project.title}
                      </div>
                    ))}

                    {remainingTitles > 0 ? (
                      <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-green-600 hover:bg-blue-100 transition-colors"
                      >
                        +{remainingTitles} more
                      </button>
                    ) : titles.length > 5 && (
                      <button
                        onClick={handleShowMore}
                        className="px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-green-600 hover:bg-blue-100 transition-colors"
                      >
                        Show first 5
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Gallery Display */}
          {galleryLoading ? (
            <div className="flex justify-center items-center w-full py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div>
              <span className="ml-3 text-gray-600">Loading gallery...</span>
            </div>
          ) : (
            gallery.length > 0 ? (
              <div className="mt-8 px-4">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  modules={[Autoplay, Navigation, Pagination]}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                    dynamicBullets: true,
                  }}
                  navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  className="modern-gallery-swiper relative"
                >
                  {gallery.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <img
                          src={imageUrl}
                          alt={`Project gallery ${index + 1}`}
                          className="w-full h-84 md:h-96 object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                          <span className="text-white font-medium text-lg">Image {index + 1}</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper>
                <style jsx global>{`
        .modern-gallery-swiper {
          --swiper-navigation-color: #10B981; /* green-500 */
          --swiper-pagination-color: #10B981;
          --swiper-pagination-bullet-size: 10px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
          padding-bottom: 40px;
        }
        .modern-gallery-swiper .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full py-8">
                {/* <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600"></div> */}
                <span className="ml-3 text-gray-600">Project Gallery is not available.</span>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}