export const getVideos = async () => {
  const apiKey = import.meta.env.VITE_API_KEY_YOUTUBE;
  if (!apiKey) {
    console.error("❌ No se encontró la API key de YouTube");
    return [];
  }

  const queries = [
    "Rock",
    "Rock nacional",
    "cumbia",
    "chacarera",
    "cuarteto",
    "reggae",
    "reggaeton",
    "Regueton"
  ];

  let allVideos = [];

  for (const q of queries) {
    try {
      const searchResp = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&type=video&maxResults=20&q=${encodeURIComponent(q)}` +
        `&videoCategoryId=10&videoDuration=medium&key=${apiKey}`
      );
      if (!searchResp.ok) {
        console.warn(`⚠️ Falló búsqueda para: ${q}`);
        continue;
      }

      const searchData = await searchResp.json();
      const videoIds = searchData.items.map(v => v.id.videoId).filter(Boolean).join(",");
      if (!videoIds) continue;

      const videosResp = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=snippet,statistics&id=${videoIds}&key=${apiKey}`
      );
      if (!videosResp.ok) {
        console.warn(`⚠️ Falló fetch de videos para: ${q}`);
        continue;
      }

      const videosData = await videosResp.json();
      if (videosData.items) allVideos.push(...videosData.items);

    } catch (error) {
      console.error(`💥 Error fetch query "${q}":`, error);
    }
  }

  if (allVideos.length === 0) {
    console.warn("⚠️ No se pudieron obtener videos, retornando array vacío");
    return [];
  }

  // Intentamos filtrar canales verificados y con muchas vistas, pero si no hay suficiente, devolvemos lo que haya
  try {
    const channelIds = Array.from(new Set(allVideos.map(v => v.snippet.channelId)));
    const verifiedChannels = [];

    for (let i = 0; i < channelIds.length; i += 50) {
      const batch = channelIds.slice(i, i + 50).join(",");
      try {
        const channelResp = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${batch}&key=${apiKey}`
        );
        if (!channelResp.ok) continue;

        const channelData = await channelResp.json();
        if (channelData.items) {
          verifiedChannels.push(...channelData.items.filter(ch => ch.snippet && ch.snippet.customUrl));
        }
      } catch {}
    }

    const verifiedIds = new Set(verifiedChannels.map(ch => ch.id));
    let officialVideos = allVideos.filter(v => verifiedIds.has(v.snippet.channelId));

    // Filtrar por vistas mínimas (ejemplo 20 millones)
    officialVideos = officialVideos.filter(v => parseInt(v.statistics.viewCount || 0) >= 20000000);

    if (officialVideos.length === 0) {
      console.warn("⚠️ No hay videos oficiales con vistas suficientes, devolviendo videos sin filtrar");
      officialVideos = allVideos; // fallback
    }

    // Mezclar aleatoriamente y limitar a 50
    for (let i = officialVideos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [officialVideos[i], officialVideos[j]] = [officialVideos[j], officialVideos[i]];
    }

    return officialVideos.slice(0, 50);
  } catch (error) {
    console.error("💥 Error procesando videos oficiales:", error);
    return allVideos.slice(0, 50); // fallback general
  }
};
