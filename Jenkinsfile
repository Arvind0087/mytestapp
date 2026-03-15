pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "arvind090/node-cicd-app:${BUILD_NUMBER}"
    }

    stages {
        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Arvind0087/mytestapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose pull
                docker-compose up -d
                '''
            }
        }
    }
}

