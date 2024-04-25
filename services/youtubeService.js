const {
  YOUTUBE_BASE_URL,
  PLAYLIST_ITEMS_ENDPOINT,
  MAX_RESULTS,
} = require("../config/constants");

// Function to build URLs for YouTube API calls
const buildYouTubeApiUrl = (endpoint, params) => {
  // Construct URL based on endpoint and parameters
  return `${YOUTUBE_BASE_URL}${endpoint}?${params}`;
};

exports.getPlaylistItems = async (playlistId, apiKey, maxResults = 20) => {
  const url = buildYouTubeApiUrl(
    PLAYLIST_ITEMS_ENDPOINT,
    `part=snippet&playlistId=${playlistId}&key=${apiKey}&${MAX_RESULTS}=${maxResults}`
  );
  // API call logic using the constructed URL
};
