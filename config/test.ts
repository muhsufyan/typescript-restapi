export default {
    port: 8000,
    dbUri: "mongodb://localhost:27017/rest-api-typescript",
    saltWorkFactor: 10,
    publicKey:`-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFGnpvuFpuWqCLGnnPXmhSBKdU/X
qVyaiards72JEsztkMeMFcJ7TfJkyBKwv9/jmRW/YZWhraNnDJnGS5fTjg33GeM4
aEXKnHU7lEKIN3Hr6XDGLULnE535YDQgCsLfS1b9MUop7910ccZbiJy/6plUEEjy
7PgTZQTBbrlKNH+DAgMBAAE=
-----END PUBLIC KEY-----`,
    privateKey:`-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgFGnpvuFpuWqCLGnnPXmhSBKdU/XqVyaiards72JEsztkMeMFcJ7
TfJkyBKwv9/jmRW/YZWhraNnDJnGS5fTjg33GeM4aEXKnHU7lEKIN3Hr6XDGLULn
E535YDQgCsLfS1b9MUop7910ccZbiJy/6plUEEjy7PgTZQTBbrlKNH+DAgMBAAEC
gYAcm/MDmVZajXKyXBnAhl4KbEwiB1vNmE+30CnTtJ0js/DQGaLeGzm6Pdljww3X
MfVHC2DzfkxKPibKEhIWRgc1NBe+sLTspM6BCLYNS/1emFgYoS4eaRkjWIfXD/Mh
Z58YtruQml2TNxvjwJ8uvwzn6IXZRdhYtccou/O1T+HrgQJBAJFh7HMdoTd5JVwh
6nEk+PBl7VdrfCtwAi2tUtm6LawDjrflK3MqiR7NZV4+BAonpikjkNmilMVXMrz0
4UR7b+MCQQCPyKf84lGyecjHnt9er1pN1EPNlKwvZDvJE6JgC0+fggUq6oIND5uX
I/Tt1CLGWtp9kA1YqjefTuyKFDJgkoPhAkBpN6zQF4ahRk1So70wC+ka2zntxf3E
1jjNZB6NM2BwmNaGoxZSMFuy7kZJ8aosy0tHhNUFndP8CsLO3I/YZ1mvAkBbU614
D9yqi3Y/bSceAi1OwCOtAeD4XScoSgNaE/UoMLLNlpSybRZ7wsgBBDxuVyjulkAT
8FJSKxRNhBSXiJihAkEAhg1BNnbomPUTw3FRTW7m8DwcexMYPioqhnsJzdFh2kT0
zCKpbG3wBBKoc7E81xXxUjOGEs+kJWyZmvHETZhZfQ==
-----END RSA PRIVATE KEY-----`,
    // lama token expire (ttl/time to live)
    accessTokenTtl:'15m',
    // token refresh ttlnya 1 thn
    refreshTokenTtl:'1y'
}