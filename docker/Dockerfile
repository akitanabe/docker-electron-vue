FROM ubuntu:latest

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ARG NODE_VERSION=12
ARG NPM_GLOBAL=/usr/local/share/npm-global

EXPOSE 8080

ARG LOCALE=ja_JP

ENV TZ Asia/Tokyo

# change ubutu repsitory
RUN sed -i -e 's%http://.*.ubuntu.com%http://ftp.jaist.ac.jp/pub/Linux/ubuntu/%g' /etc/apt/sources.list

# Configure apt and install packages
RUN apt-get update \
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends apt-utils dialog 2>&1 \
    #
    # location setting
    && apt-get install -y locales \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i ${LOCALE} -c -f UTF-8 -A /usr/share/locale/locale.alias ${LOCALE}.UTF-8 \
    #
    # install git iproute2, procps, lsb-release (useful for CLI installs)
    && apt-get update \
    && apt-get -y install git openssh-client less procps iproute2 lsb-release libzip-dev unzip \
    #
    # Create a non-root user to use if preferred - see https://aka.ms/vscode-remote/containers/non-root-user.
    && groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support for the non-root user
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
    && chmod 0440 /etc/sudoers.d/$USERNAME \
    #
    # # Node.js install    
    && apt-get -y install curl \
    && export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 \
    && curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - \
    && apt-get update \
    && apt-get install --no-install-recommends -y nodejs \
    #
    # Set alternate global install location that both users have rights to access
    && mkdir -p ${NPM_GLOBAL} \
    && chown ${USERNAME}:root ${NPM_GLOBAL} \
    && npm config -g set prefix ${NPM_GLOBAL} \
    && sudo -u ${USERNAME} npm config -g set prefix ${NPM_GLOBAL} \
    #
    # yarn setup
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - 2>/dev/null \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \ 
    && apt-get update \
    && apt-get install --no-install-recommends yarn\
    #
    # setup xserver
    && apt-get install -y xserver-xorg \
    #
    # electron require libraries
    && apt-get install -y libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1 libgtk-3-0 \    
    #
    # Clean up
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

ENV LANG ${LOCALE}.utf8
ENV LANGUAGE ${LOCALE}.utf8
ENV LC_ALL ${LOCALE}.utf8

