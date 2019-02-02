https://kimsereyblog.blogspot.com/2018/10/docker-compose-asp-net-core-application.html

docker build -t sql .
docker run --rm -it -d -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=MyPassword001" -p 1433:1433 sql 