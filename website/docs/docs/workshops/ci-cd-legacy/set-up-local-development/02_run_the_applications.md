---
id: run-the-applications
title: Run the applications
---

Start up the provider API by running `npm run start`, note the terminal output.

```
> product-service@1.0.0 start
> node server.js

Provider API listening on port 8080...
```

Open a separate terminal for the consumer.

Before starting the consumer, we need to configure it so it knows the address of our running provider.

create a `.env` file in the root of the project and add:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080
```

Then run:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see a list of products.
