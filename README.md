# typescript-restapi
https://www.youtube.com/watch?v=BWUi6BS9T5Y<br>
<h1>session (token jwt akan disimpan ke db), buat token jwt</h1>
<ul>
    <li>pertama buat src/models/session.model.ts, untuk membuat model session<br></li>
    <li>buat src/service/session.service.ts untuk service</li>
    <li>panggil service di controller, tp buat dulu controller sessionnya src/controller/session.controller.ts</li>
    <li>di service user buat validasi password</li>
    <li>buat schema src/schema/user.schema.ts untuk validasi (request filter/filter input user)</li>
    <li>buat src/utils/jwt.utils.ts untuk membuat token jwt</li>
</ul>
