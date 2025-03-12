pipeline {
    agent any
    
    environment {
        BACKEND_DIR = 'clinica-veterinaria-backend'
        FRONTEND_DIR = 'clinica-veterinaria-frontend'
    }

    stages {
        stage('Clonar código') {
            steps {
                git branch: 'main', url: 'https://github.com/EstebanPav/HistoriasVeterinarias.git'
            }
        }

        stage('Instalar dependencias del backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Instalar dependencias del frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
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
