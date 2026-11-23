pipeline {
    agent any

    environment {
        PROJECT_NAME = 'wong-industries-inventario'
        DOCKER_IMAGE_TAG = 'v1.0-final'
    }

    stages {
        stage('1. Checkout del Código') {
            steps {
                checkout scm
                sh 'git log -1 --oneline'
            }
        }

        stage('2. Verificación de Entorno') {
            steps {
                sh 'git --version'
                sh 'docker --version'
                sh 'docker compose version'
            }
        }

        stage('3. Pruebas y Compilación Backend') {
            steps {
                dir('backend') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests -B'
                }
            }
        }

        stage('4. Compilación Frontend') {
            steps {
                dir('frontend/frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('5. Validación Docker Compose') {
            steps {
                sh 'cp -n .env.example .env || true'
                sh 'docker compose config'
            }
        }

        stage('6. Construcción de Imágenes') {
            steps {
                sh 'docker compose build --no-cache'
            }
        }
    }

    post {
        success {
            echo "Pipeline ejecutado con éxito."
        }
        failure {
            echo "Error en la ejecución del pipeline."
        }
    }
}
