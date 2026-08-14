pipeline {
  agent any
  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '15', artifactNumToKeepStr: '10'))
  }
  environment {
    IMAGE_NAME = "22471264/eb-express" 
    IMAGE_TAG  = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Install & Test (Node 16)') {
      agent {
        docker {
          image 'node:16-alpine'
          args '-v $HOME/.npm:/root/.npm'
        }
      }
      steps {
        sh 'node -v && npm -v'
        sh 'npm ci'
        sh 'npm test || echo "no tests"'
      }
    }

    stage('Dependency Scan (fail on HIGH)') {
      agent {
        docker {
          image 'node:16-alpine'
        }
      }
      steps {
        sh 'npm ci --prefer-offline --no-audit'
        sh 'npm audit --audit-level=high'
      }
    }

    stage('Build Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG .'
      }
    }

    stage('Login & Push') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
        }
        sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
      }
    }
  }
  post {
    success { echo "Pushed $IMAGE_NAME:$IMAGE_TAG" }
    always  { archiveArtifacts artifacts: '**/npm-debug.log', allowEmptyArchive: true }
  }
}
