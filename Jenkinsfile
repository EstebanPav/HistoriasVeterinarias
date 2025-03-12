pipeline {
    agent any
    
    environment {
        BACKEND_DIR = 'clinica-veterinaria-backend'
        FRONTEND_DIR = 'clinica-veterinaria-frontend'
        DOCKER_IMAGE = 'mi-app:latest'
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

        stage('Ejecutar pruebas del backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm test'
                }
            }
        }

        stage('Ejecutar pruebas del frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm test'
                }
            }
        }

        stage('Construir artefacto del frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Construir imagen Docker') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Desplegar') {
            steps {
                sh 'docker run -d -p 3000:3000 ${DOCKER_IMAGE}'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado con éxito'
        }
        failure {
            echo 'El pipeline ha fallado'
        }
    }
}
