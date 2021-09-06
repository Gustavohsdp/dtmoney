import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import { App } from "./App";

createServer({
  models: {
    transactions: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-09-06 09:00:26'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1200,
          createdAt: new Date('2021-09-10 14:00:26'),
        },
      ],
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all('transactions');
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transactions', data);
    })
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
