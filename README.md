# agile-develop

## API + Client

Project now includes:
- **Server/API** in `./api`
- **Client (HTML/CSS/JS)** served by the same server at `/`

### Run

```bash
cd api
npm install
npm run seed
npm run build:docs
npm start
```

### Open in browser

- Client UI: `http://localhost:3000/`
- API docs (HTML): `http://localhost:3000/docs`
- API endpoint: `http://localhost:3000/api/music`
