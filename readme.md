Sample for dockerize dotnetcore application composed:
*1 SQL Server
*1 api fullrest write in dotnet core
*1 web site in react

# dockerize environnement
docker-compose -f docker-compose-build.yml up --build -d
docker-compose up --build
docker-compose up -d
docker-compose kill
docker-compose rm -f

# http://localhost:3000/api/tasks/5 ==> connectionString
# http://localhost:3000/api/tasks

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

docker exec -ti xxxxxx bash

# connection sur Azure
az login
az account list --output table

# connection sur le container kubernetes
az acr login --name containerKubernetes

# retourne le nom interne du container registry
az acr list --resource-group Kubernetes --query "[].{acrLoginServer:loginServer}" --output table

# tag et push l'image sql
docker tag mcr.microsoft.com/mssql/server:2017-latest containerkubernetes.azurecr.io/sql:v1
docker push containerkubernetes.azurecr.io/sql:v1

# tag et push l'image api
docker tag complexapplication_api containerkubernetes.azurecr.io/api:v1
docker push containerkubernetes.azurecr.io/api:v1


# liste des images dans le container registry
az acr repository list --name containerkubernetes --output table



az aks get-credentials --resource-group kubernetes --name clusterKubernetes
kubectl apply -f azure.yaml

kubectl scale --replicas=5 deployment/api
kubectl scale --replicas=0 deployment/api