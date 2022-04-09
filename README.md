# typescript-restapi
https://www.youtube.com/watch?v=BWUi6BS9T5Y<br>
<h1>get session</h1>
<ul>
    <li>buat route get session<br></li>
    <li>buat controller get session (getUserSessionHandler) di session.controller.ts</li>
    <li>buat juga service untuk get session (findSession) di session.service.ts/li>
    <li>untuk mengetahui id user yg login kita perlu middleware (deserializeUser.ts), ini akan get token dan decode token dimana payload hsl decode diberikan ke controller session get user session</li>
    <li>di app gunakan middleware-nya</li>
    <li>memastikan jika tdk ada id maka buat 1 middleware (requireUser.ts)</li>
</ul>
