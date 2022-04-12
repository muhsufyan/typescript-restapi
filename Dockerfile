# use node version 14
FROM node:14.0

# tambahkan library yg telah kita buat ke image app kita (kita gunakan npm)
ADD package.json/ /tmp/package.json
# tambahkan yaml lock-nya ke image app yg kita buat(kita gunakan npm, jika memakai yarn maka yarn.lock)
ADD package-lock.json /tmp/package-lock.json
# hapus semua folder dlm direktori build yg telah diset pada tsconfig.json dibagian outDir
RUN rm -rf build
# masuk dulu ke direktori tmp lalu install semua library dlm package.json (dg npm jika memakai yarn maka yarn install)
RUN cd /tmp && npm install
# tambahkan semua yg ada dlm folder src ke image app yg kita buat
ADD ./ /src
# cp : copas, -a : all/semua
RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src
# direktori kita bekerja, ingin cek pwd
WORKDIR /src
# sama dg yarn build
RUN npm build
CMD ["node","build/src/app.js"]
