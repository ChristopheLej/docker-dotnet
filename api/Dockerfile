FROM microsoft/dotnet
WORKDIR /app

# Copy output
COPY ./publish .

EXPOSE 80

ENTRYPOINT ["dotnet", "api.dll"]
# CMD dotnet api.dll