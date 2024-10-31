chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "generateImage",
      title: "Crear imagen con DALL·E",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "generateImage" && info.selectionText) {
      const prompt = info.selectionText;
  
      // Llamada a la API de OpenAI
      const apiKey = "TU_OPENAI_API_KEY"; // Inserta tu API Key de OpenAI aquí
      const url = "https://api.openai.com/v1/images/generations";
  
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
        chrome.action.openPopup();
      } else {
        console.error("Error generando la imagen:", data);
      }
    }
  });
  