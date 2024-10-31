chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "generateImage",
      title: "Crea una imagen aqui wey",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "generateImage" && info.selectionText) {
      const prompt = info.selectionText;
  
      // Llamada a la API de OpenAI
      const apiKey = "xxx"; // Inserta tu API Key de OpenAI aquí
      const url = "https://api.openai.com/v1/images/generations";
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 1,
            size: "1024x1024"
          })
        });
  
        const data = await response.json();
  
        if (data.data && data.data.length > 0) {
          const imageUrl = data.data[0].url;
          chrome.storage.local.set({ generatedImage: imageUrl });
  
          // Muestra una notificación para avisar al usuario
          chrome.notifications.create({
            type: "basic",
            iconUrl: "images/48LOGO.png",
            title: "Imagen Generada",
            message: "Haz clic en el icono de la extensión para ver la imagen."
          });
        } else {
          console.error("Error generando la imagen:", data);
        }
      } catch (error) {
        console.error("Error en la llamada a la API:", error);
      }
    }
  });
  