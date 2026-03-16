
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "arvind090/node-cicd-app:latest"
    }

    stages {
        stage('Clone Code') {
            steps {
                echo "Cloning the code"
                git branch: 'main', url: 'https://github.com/Arvind0087/mytestapp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Building the docker image"
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login DockerHub') {
            steps {
                echo "Login to dockerhub"
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
                echo "Pushing the image to dockerhub"
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy Container') {
            steps {
                echo "Deploying the container"
                // sh '''
                // docker stop my-app || true
                // docker rm my-app || true
                // docker run -d -p 8000:8000 --name node-app $DOCKER_IMAGE
                // '''
                
            sh '''
                # Stop any container using port 8000
                docker ps -q --filter "publish=8000" | xargs -r docker rm -f
    
                docker rm -f my-app || true
                docker-compose down || true
                docker-compose up -d
            '''
            }
        }
    }
}
