# Builds everything from backend folder
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS builder
WORKDIR /backend
COPY backend/package*.json .
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
COPY backend/. .

# Builds everything in UI folder
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build




# Creates the working directory for the extension
FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16
# Extension information that is displayed in the sidebar/extension menu
LABEL org.opencontainers.image.title="Docketeer" \
  org.opencontainers.image.description="Docker extension for monitoring and managing your containers, images, and networks" \
  org.opencontainers.image.vendor="Docketeer team" \
  com.docker.desktop.extension.api.version="0.3.0" \
  com.docker.desktop.extension.icon="ui/assets/docketeer-logo-light.png" \
  com.docker.extension.screenshots='[{"alt":"Containers page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-containers-page.png"}, \
  {"alt":"Network page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-network-page.png"}, \
  {"alt":"Image page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-image-page.png"}, \
  {"alt":"Metrics page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-network-page.png"}, \
  {"alt":"Volume History page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-volume-page.png"}, \
  {"alt":"Process Logs page", "url":"https://raw.githubusercontent.com/oslabs-beta/docketeer-extension/cleanup/comments/assets/docketeer-processlogs-page.png"}]' \
  com.docker.extension.detailed-description="<h3>Description</h3> \
  <p>Greetings, fellow space traveler! We're thrilled that you've chosen our application to help you navigate and explore the vast universe of Docker infrastructure. As a Docketeer, you know that real-time tracking of metrics and logs is essential for staying ahead of potential issues and optimizing your workflows. Our extension provides you with the tools you need to take control of your Docker images, containers, volumes, and logs. With an intuitive interface, you can easily make the necessary adjustments to ensure a smooth journey through the cosmos of your Docker environment.</p> \
  <h4>About us</h4> \
  <p>As a team of passionate engineers, we are dedicated to improving the workflow of developers as they explore the vast universe of Docker infrastructure. We know that space travel can be complex and challenging, but with the right tools and support, you can navigate the stars with ease.</p> \
  <p>Our mission is to provide Docketeers like you with the tools and support you need to make your Docker journey as smooth as possible. We strive to make our application intuitive, powerful, and user-friendly so that you can focus on exploring the Docker universe without worrying about the technical details.</p>" \
  com.docker.extension.publisher-url="https://docketeer.io/" \
  com.docker.extension.additional-urls='[{"title":"Extension-Github","url":"https://github.com/oslabs-beta/docketeer-extension"},{"title":"Browser-Based-Github","url":"https://github.com/open-source-labs/Docketeer"},{"title":"Email","url":"mailto:docketeerxii@gmail.com"},{"title":"LinkedIn","url":"https://www.linkedin.com/company/docketeer/"}]' \
  com.docker.extension.categories="utility-tools" \
  com.docker.extension.changelog="<p>Extension changelog<ul><li>Launch!</li></ul></p>"

# Installs curl
RUN apk --no-cache add curl

# Update the DOCKERVERSION to the most recent version, check dates on https://download.docker.com/linux/static/stable/x86_64/
# Installs docker to the image so it can run exec commands on the backend
ENV DOCKERVERSION=24.0.5
RUN curl -fsSLO https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKERVERSION}.tgz \
  && tar xzvf docker-${DOCKERVERSION}.tgz --strip 1 -C /usr/local/bin docker/docker \
  && rm docker-${DOCKERVERSION}.tgz

# Copies necessary files into extension directory
COPY --from=builder /backend backend
COPY docker-compose.yaml .
COPY metadata.json .
COPY docketeer.svg .
COPY --from=client-builder /ui/build ui

# Creates and copies files to folders that docker-compose will use create named volumes from
COPY imageConfigs/prometheus prometheus
COPY imageConfigs/grafana grafana

# Starts the application
WORKDIR /backend
CMD ["npm", "start"]