window.function = function(json_string, address) {
  // Parse JSON input
  let parsedData;
  try {
    parsedData = JSON.parse(json_string.value);
  } catch (e) {
    return "Error: Invalid JSON format.";
  }

  // Ensure the JSON structure matches expected format
  if (!parsedData.results || !Array.isArray(parsedData.results)) {
    return "Error: Invalid data structure; 'results' array not found.";
  }

  // Search for the place with the matching address
  const place = parsedData.results.find(item => item.vicinity === address.value);

  // If no matching place found, return an error
  if (!place) {
    return "Error: No matching place found for the given address.";
  }

  // Extract types and geometry.location fields
  const types = place.types || [];
  const latitude = place.geometry?.location?.lat || "";
  const longitude = place.geometry?.location?.lng || "";

  // Format the output with all required fields
  const output = {
    name: place.name || "",
    vicinity: place.vicinity || "",
    place_id: place.place_id || "",
    latitude: latitude,
    longitude: longitude,
    types_1: types[0] || "",
    types_2: types[1] || "",
    types_3: types[2] || ""
  };

  // Return as a single JSON-formatted string
  return JSON.stringify(output);
};