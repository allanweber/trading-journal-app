# Trading Journal Web

## Change Log

### 0.1.0

* Fully functional application with entries simple CRUDs

## Docker

```bash
docker build -t allanweber/trading-journal-web:<version> -f docker/Dockerfile .
```

```bash
docker tag allanweber/trading-journal-web:<version> allanweber/trading-journal-web:latest
```

```bash
docker push allanweber/trading-journal-web:latest
```

```bash
docker run -p 3000:80 --name trading-journal-web allanweber/trading-journal-web:<version>
```
