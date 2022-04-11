# typescript-restapi
https://www.youtube.com/watch?v=5aryMKiBEKY<br>
<h1>swagger ui api untuk user</h1>
<ul>
    <li>disetiap route (routes.ts) bagian atasnya tambahkan komen khusus, komen ini(bntknya yml) akan digenerate jd bntk ui</li>
    <li>untuk request body (termasuk filter request(input schema) dan filter response(response schema)) kita perlu menambahkan component disetiap schema (saat ini user.schema.ts)</li>
    <li>untuk yg perlu url param sprti update product yg memerlukan url param yaitu productId maka kita set parameters:</li>
</ul>
