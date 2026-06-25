FROM quay.io/christech/gaaju-md:latest

WORKDIR /root/gaaju-md

RUN git clone https://github.com/Xchristech2/GAAJU-MD . && \
    npm install

EXPOSE 5000

CMD ["npm", "start"]
