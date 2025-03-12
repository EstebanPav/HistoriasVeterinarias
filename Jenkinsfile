pipeline {
    agent any
    
    environment {
        BACKEND_DIR = 'clinica-veterinaria-backend'
        FRONTEND_DIR = 'clinica-veterinaria-frontend'
        PORT_BACKEND = '5000'
        PORT_FRONTEND = '3000'
    }

    stages {

        stage('Instalar dependencias del backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'npm install'
                }
            }
        }

        stage('Instalar dependencias del frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Desplegar backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'start npm run start'   // Esto inicia el backend en segundo plano
                }
            }
        }

        stage('Desplegar frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'start npm run start'   // Esto inicia el frontend en segundo plano
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completado con éxito!'
        }
        failure {
            echo '❌ El pipeline ha fallado.'
        }
    }
}
