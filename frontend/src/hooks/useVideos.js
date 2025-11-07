import { useEffect, useState } from "react";
import { getVideos } from "../services/getVideos";

export const useVideos = () => {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getVideos();
        setVideos(res);
      } catch (error) {
        console.error("💥 Error al cargar los videos:", error);

        const mockVideos = [
          {
            id: "1",
            snippet: {
              title: "Video de ejemplo 1",
              thumbnails: { high: { url: "https://via.placeholder.com/480x270?text=Video+1" } },
            },
            statistics: { viewCount: "100000" },
          },
          {
            id: "2",
            snippet: {
              title: "Video de ejemplo 2",
              thumbnails: { high: { url: "https://via.placeholder.com/480x270?text=Video+2" } },
            },
            statistics: { viewCount: "50000" },
          },
        ];
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading };
};
