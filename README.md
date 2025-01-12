# Cryptocurrency Portfolio Tracker

This is a simple web application that helps users manage their cryptocurrency portfolios. It allows users to add, edit, and delete cryptocurrencies, track their profit/loss, and visualize portfolio distribution using dynamic charts.

Created by **Abdelrahman Amer**.

---

## Features

- **Add Cryptocurrencies**: Easily add cryptocurrencies with details like name, amount, and purchase price.
- **Edit or Delete Entries**: Update or remove entries as needed.
- **Profit/Loss Calculation**: Automatically calculates profit or loss based on current prices.
- **Dynamic Charts**: Visualize portfolio distribution and monitor performance.
- **Real-Time Data**: Fetches live cryptocurrency prices using the CoinGecko API.

---

## Technologies Used

### **Frontend**
- HTML
- CSS (with Bootstrap)
- JavaScript
- Chart.js (for charts)

### **Backend**
- Node.js
- Express.js
- MySQL (for database)

### **APIs**
- [CoinGecko API](https://www.coingecko.com/en/api) for real-time cryptocurrency prices.

---

## Installation and Setup

### **1. Clone the Repository**

    git clone https://github.com/amer2040/crypto-portfolio-tracker.git
    cd crypto-portfolio-tracker

### **2. Backend Setup***
    - **Install dependencies:**
        bash:
        * cd backend
        * npm install

    - *Configure the database connection in server.js:
        const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'yourpassword',
        database: 'crypto_portfolio',
        });

    *Run the server:
        bash:
        node server.js

### **3. Frontend Setup***
    *Open index.html in your browser:

        cd frontend
        open index.html

### Usage
    - Open the app in your browser.
    - Add cryptocurrencies by providing the name, amount, and purchase price.
    - View your portfolio with real-time profit/loss calculations.
    - Edit or delete cryptocurrencies as needed.
    - Visualize portfolio distribution with a dynamic pie chart.

### Future Improvements:
    1.Enhance the UI for better user experience.
    2.Add features like notifications and exporting reports.
    3.Optimize performance for larger datasets.

### License:
This project is open-source and available under the [MIT License](LICENSE).

### Acknowledgments:
    *CoinGecko API for cryptocurrency data.
    *Chart.js for beautiful and interactive charts.