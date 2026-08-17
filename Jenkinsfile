pipeline {
    agent {
        // Use Node 16 Docker image as the build agent
        docker { image 'node:16' }
    }

    environment {
        // Set the Docker image name and tag
        IMAGE_NAME = 'chiamintwts/assignment2_22165266:latest'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                // Install dependencies - Node.js
                sh 'npm install'
            }
        }
        stage('Run Unit Tests') {
            steps {
                // Run the test suite
                sh 'npm test'
            }
        }
        stage('Security Scan') {
            steps {
                // Install Snyk CLI and run a scan
                sh 'npm install -g snyk'
                // Pipeline fails if any high severity issues are found
                sh 'snyk test --severity-threshold=high'
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build the Docker image for the app
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Push Docker Image') {
            steps {
                // Login to Docker Hub and push the image
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
                    sh 'docker push $IMAGE_NAME'
                }
            }
        }
    }
}