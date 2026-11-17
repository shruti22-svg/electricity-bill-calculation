pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
    }

    environment {
        IMAGE_NAME = 'electricity-bill-calculation'
        APP_PORT = '5000'
        HOST_PORT = '5000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker version'
                    } else {
                        bat 'docker version'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER -t $IMAGE_NAME:latest .'
                    } else {
                        bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest .'
                    }
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            docker rm -f electricity-bill-app || true
                            docker run -d --name electricity-bill-app -p ${HOST_PORT}:${APP_PORT} ${IMAGE_NAME}:latest
                        '''
                    } else {
                        bat '''
                            docker rm -f electricity-bill-app || exit /b 0
                            docker run -d --name electricity-bill-app -p %HOST_PORT%:%APP_PORT% %IMAGE_NAME%:latest
                        '''
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    if (isUnix()) {
                        sh '''
                            ok=0
                            for i in 1 2 3 4 5 6 7 8 9 10; do
                              if wget -qO- http://host.docker.internal:${HOST_PORT}/health >/dev/null 2>&1 || curl -fsS http://host.docker.internal:${HOST_PORT}/health >/dev/null 2>&1 || curl -fsS http://localhost:${HOST_PORT}/health >/dev/null 2>&1; then
                                ok=1
                                break
                              fi
                              sleep 2
                            done
                            if [ "$ok" != "1" ]; then
                              echo "App did not become healthy on port ${HOST_PORT}"
                              exit 1
                            fi
                            echo "App is healthy on port ${HOST_PORT}"
                        '''
                    } else {
                        bat '''
                            powershell -NoProfile -Command "$ok=$false; for($i=0;$i -lt 15;$i++){ try { $r=Invoke-WebRequest -UseBasicParsing http://localhost:%HOST_PORT%/health; if($r.StatusCode -eq 200){ $ok=$true; break } } catch { Start-Sleep -Seconds 2 } }; if(-not $ok){ Write-Host 'App did not start'; exit 1 } else { Write-Host 'App is UP on port %HOST_PORT%' }"
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed. Image ${IMAGE_NAME}:latest is running on host port ${HOST_PORT}."
        }
        failure {
            echo 'Pipeline failed. Check Docker engine and Jenkinsfile at repository root.'
        }
    }
}
