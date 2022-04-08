# typescript-restapi
https://www.youtube.com/watch?v=BWUi6BS9T5Y<br>
<ul>
    <li>yarn init</li>
    <li>dependensi untuk production<b>yarn add express zod config cors express mongoose pino pino-pretty dayjs bcrypt jsonwebtoken lodash nanoid</b>
    <br>dependensi untuk development<b>yarn add @types/body-parser @types/config @types/cors @types/express @types/node @types/pino @types/bcrypt @types/jsonwebtoken @types/lodash @types/nanoid ts-node-dev typescript -D</b></li>
    <li>buat src/app.ts</li>
    <li>agar app berjln autoreload pd mode development, di package.json tambahkan kode brkt <br>
    <b>"scripts": {"dev":"ts-node-dev --respawn --transpile-only src/app.ts"},</b><br>script tsb menjlnkan package ts-node-dev. cara run "yarn dev"</li>
    <li>buat config typescript <b>npx tsc --init</b> file baru tsconfig.json untuk config typescript<br>
    disini uncomment "outDir": "build",</li>
    <li>buat config/default.ts berisi config yg kita set (sprti .env),ini memakai package config</li>
</ul>
