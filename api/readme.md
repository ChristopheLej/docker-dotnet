# compile application
dotnet restore
dotnet publish -o ./publish

# test application (view in https://localhost:5001/api/v1/task)
dotnet  .\publish\api.dll

# dockerize application (view in http://localhost:3030/api/v1/task)
docker build -t api .
docker run --rm -it -p 3030:80 -e "ASPNETCORE_ENVIRONMENT=Production"  api
docker run --rm -it -p 3030:80 -e "ASPNETCORE_ENVIRONMENT=Production"  api bash