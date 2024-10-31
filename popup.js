document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get("generatedImage", (data) => {
      const imageUrl = data.generatedImage;
      if (imageUrl) {
        const imageElement = document.getElementById("generatedImage");
        imageElement.src = imageUrl;
      } else {
        console.error("No se encontró la URL de la imagen generada.");
      }
    });
  });
  