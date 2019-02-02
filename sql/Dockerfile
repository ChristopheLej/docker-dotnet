FROM mcr.microsoft.com/mssql/server:2017-latest

# Install node/npm
RUN apt-get -y update  && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
    apt-get install -y nodejs

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN npm install

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh

CMD /bin/bash ./entrypoint.sh

