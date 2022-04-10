# typescript-restapi
https://www.youtube.com/watch?v=r5L1XRZaCR0<br>
<h1>get product testing, product not exist expected</h1>
<ul>
    <li>supertest adlh asynchronous jd perlu async await</li>
    <li><b>yarn test --detectOpenHandles --watchAll</b> untuk mendeteksi jika terjd test error</li>
    <li>kita harus mengubah kode di app.ts agar test dpt berjln<br>1) buat src/utils/server.ts lalu pindahkan beberapa kode app.ts ke server.ts<br>copas & rename config/default.ts jd config/test.ts</li>
    <li>kita perlu mock untuk operasi ke db maka tambah kodenya di __test__/product.test.ts<br>
    sblm itu kita install dulu <b>yarn add mongodb-memory-server -D</b></li>
</ul>
