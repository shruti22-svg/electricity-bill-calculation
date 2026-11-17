# Electricity Bill Calculation

Web app that calculates an electricity bill from units consumed, with Docker packaging and a Jenkins pipeline that builds and runs the image.

## Ports

| Service | Inside container | On your machine | URL |
| --- | --- | --- | --- |
| Electricity bill app | **5000** | **5000** | http://localhost:5000 |
| Jenkins UI | **8080** | **8080** | http://localhost:8080 |
| Jenkins agents | **50000** | **50000** | used by Jenkins only |

Docker image name: `electricity-bill-calculation:latest`  
App container name: `electricity-bill-app`

## Slab rates

- 0–100 units: Rs 1.50 / unit
- 101–200 units: Rs 2.50 / unit
- 201–300 units: Rs 4.00 / unit
- 301–500 units: Rs 6.00 / unit
- Above 500 units: Rs 8.00 / unit
- Fixed charge: Rs 50 (when units > 0)

## Run the app with Docker

```bash
docker build -t electricity-bill-calculation:latest .
docker run -d --name electricity-bill-app -p 5000:5000 electricity-bill-calculation:latest
```

Or:

```bash
docker compose up -d --build electricity-bill
```

## Jenkins

1. Start Docker Desktop.
2. From this folder: `docker compose up -d --build jenkins`
3. Open http://localhost:8080
4. Login: `admin` / `admin`
5. Open job `electricity-bill-calculation` and click **Build Now**

The job uses the **root** `Jenkinsfile` (`scriptPath: Jenkinsfile`). It builds `electricity-bill-calculation:<build>` and `latest`, then runs the container on host port **5000**.
