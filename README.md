# typescript-restapi
https://www.youtube.com/watch?v=BWUi6BS9T5Y<br>
<h1>buat model yg akan di migrasi ke db, hash & compare password dg bcrypt</h1>
<ul>
    <li>pertama buat src/models/user.model.ts, untuk membuat model user<br>shema sebagai input dari middleware validateResource <br> misal hrs ada email, minimal nama 4 karakter, dll</li>
    <li>buat route /halo di src/routes.ts</li>
    <li>schema dibuat dg package zod</li>
    <li>src/models/user.model.ts juga untuk hash dan compare password user</li>
</ul>
