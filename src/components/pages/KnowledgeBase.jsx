import React, { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';

function KnowledgeBase() {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [urls, setUrls] = useState(['']);

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async () => {
    try {
      // Updated validation - only check URLs
      const validUrls = urls.filter((url) => url.trim() !== "");
      if (validUrls.length === 0) {
        alert("Please enter at least one valid URL");
        return;
      }

      // Updated URL construction
      const baseUrl =
        "https://elyotmkzieihocmhryim.supabase.co/functions/v1/found-doc-vector";
      const queryParams = new URLSearchParams();
      validUrls.forEach((url) => {
        queryParams.append("url", url); // Remove encodeURIComponent and change to urls[]
      });
      queryParams.append("name", selectedProduct); // Change 'product' to 'name'
      queryParams.append("tag", 'sequential_order_number'); // Add user_id parameter
      const endpoint = `${baseUrl}?${queryParams.toString()}`;
      
    
      // Try making the request with a timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased timeout to 30 seconds

      try {
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          mode: "cors",
          signal: controller.signal,
        });
        console.log("Response:", response);

        clearTimeout(timeoutId);

        // Log response details
        console.log("Response received:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}\nBody: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Success response:", data);

        // Clear form after successful submission
        setUrls([""]);
        setSelectedProduct("");
        alert("URLs submitted successfully!");
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          throw new Error("Request timed out after 30 seconds");
        }
        throw fetchError;
      }
    } catch (error) {
      console.error("Submission error details:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });

      // Provide more specific error messages
      let errorMessage = 'An error occurred while submitting URLs.';
      if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Unable to connect to the server. Please check:\n' +
          '1. Your internet connection\n' +
          '2. If the server is running\n' +
          '3. If the ngrok tunnel is active';
      } else if (error.message.includes('timed out')) {
        errorMessage = 'The request timed out. Please try again.';
      } else if (error.message.includes('HTTP Error')) {
        errorMessage = `Server error: ${error.message}`;
      }

      alert(errorMessage);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Knowledge base</h1>
        
      </div>

      {/* Main Content */}
      <div className="max-w-3xl">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Documentation title</label>
          <input
            type="text"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            placeholder="Enter documentation title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* URL Inputs */}
        <div className="space-y-4 mb-6">
          {urls.map((url, index) => (
            <input
              key={index}
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              placeholder="Enter URL"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* Add Another URL Button */}
        <button
          onClick={handleAddUrl}
          className="text-blue-600 font-medium flex items-center gap-2 mb-6"
        >
          <span className="text-xl">+</span> Add another URL
        </button>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBase; 