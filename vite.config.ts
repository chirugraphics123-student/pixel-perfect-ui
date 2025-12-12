// src/config.ts or at the top of your component
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// When fetching stock data:
const fetchStockData = async (symbol: string) => {
  try {
    const response = await fetch(`${API_URL}/api/stocks/${symbol}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null; // Return null instead of mock data
  }
};
```

### **Step 4: Check your backend is returning real data**

Test your backend directly in the browser:
```
https://marketpullse-ai-17.onrender.com/api/stocks/AAPL
