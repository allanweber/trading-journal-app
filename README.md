# Trading Journal Web

## Change Log

### 1.0.0

* Function application with entries simple CRUDs and authentication
  * 1.0.1
    * Fix some interface bugs

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
