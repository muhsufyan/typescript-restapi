# typescript-restapi
https://www.youtube.com/watch?v=BWUi6BS9T5Y<br>
<h1>delete session & refresh token</h1>
<ul>
    <li>buat route delete session<br></li>
    <li>buat controller delete session (deleteSessionHandler) di session.controller.ts</li>
    <li>buat juga service untuk update session (updateSession) di session.service.ts, ini digunakan untuk menghapus session</li>
    <li>panggil service tsb di controller deleteSessionHandler</li>
    <li><h4>REFRESH TOKEN</h4>middleware deserializeUser.ts, tambah logic jika accessToken kadaluarsa tp refresh token masih aktif</li>
    <li>kita perlu reIssue accessToken karena sdh kadaluarsa refresh token msh aktif, maka di service (session.service.ts) buat func reIssueAccessToken<br>
    </li>
</ul>
