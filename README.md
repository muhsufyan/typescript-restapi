# typescript-restapi
https://www.youtube.com/watch?v=5aryMKiBEKY<br>
<h1>setting swagger ui api</h1>
<ul>
    <li>buat src/utils/swagger.ts</li>
    <li>yarn add swagger-jsdoc swagger-ui-express<br>
    npm i --save-dev @types/swagger-jsdoc @types/swagger-ui-express</li>
    <li>swagger-jsdoc untuk dokumentasi, swagger-ui-express untuk ui-nya</li>
    <li>di tsconfig.ts uncomment resolveJsonModule, agar dpt import package.json</li>
    <li>di app.ts kita import setting swagger (src/utils/swagger.ts) lalu run dg yarn dev <br>
    kunjungi http://localhost:8000/docs untuk melihat open api ui sederhana</li>
</ul>
