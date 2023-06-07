# Trading Journal Web

## Docker

```bash
docker build -t allanweber/trading-journal-web:0.1.0 -f docker/Dockerfile .
```

```bash
docker tag allanweber/trading-journal-web:1.0.0 allanweber/trading-journal-web:latest
```

```bash
docker push allanweber/trading-journal-web:latest
```

```bash
docker run -p 3000:80 --name trading-journal-web \
-e REACT_APP_AUTHENTICATION_API=http://localhost:8080 \
-e REACT_APP_ENTRIES_API=http://localhost:8081 \
allanweber/trading-journal-web:0.1.0
```

docker build -t allanweber/trading-journal-web:0.1.0 -f docker/Dockerfile .
docker run -p 3000:80 --name trading-journal-web allanweber/trading-journal-web:0.1.0
