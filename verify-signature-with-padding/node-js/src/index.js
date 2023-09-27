const crypto = require("crypto");

function verifySignature(signature, rawBody) {
  const publicKey = (publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAunF5aDa6HCfLMMI/MZLT
5hDk304CU+ypFMFiBjowQdUMQKYHZ+fklB7GpLxCatxYJ/hZ7rjfHH3Klq20/Y1E
bYDRopyTSfkrTzPzwsX4Ur/l25CtdQldhHCTMgwf/Ev/buBNobfzdZE+Dhdv5lQw
KtjI43lDKvAi5kEet2TFwfJcJrBiRJeEcLfVgWTXGRQn7gngWKykUu5rS83eAU1x
H9FLojQfyia89/EykiOO7/3UWwd+MATZ9HLjSx2/Lf3g2jr81eifEmYDlri/OZp4
OhZu+0Bo1LXloCTe+vmIQ2YCX7EatUOuyQMt2Vwx4uV+d/A3DP6PtMGBKpF8St4i
GwIDAQAB
-----END PUBLIC KEY-----`);
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.update(rawBody);
  return verifier.verify(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_PSS_PADDING },
    signature,
    "base64",
  );
}

const signature =
  "LrQcFTFvgRxC/1aSnKn+lgHDmMNsv+F1E7/u6Y2KtbbzlUuO1ehls6F/sS+G9Q+oPuVVW/6xeMr++ygOJU5LlwwsliVxxs05OBZIvRrDwoNHqipakNN8SkZWSLdAuj1j9pv1bApwQjshFjOFPA11NgZGjdDvaB5Yayt4m3jewwR4Zxvtpqcd0MV1Ja22v3zfHQqca0Oahx4g6aLAy9WCLmVuFWZRauFKx0s+k+tPUs1ssTz/equl405T6PErQ1YbfApSqg4v0RAvHu7WWVG4s3lONU+jMUyqC4OHdf0mEgweNx9Kzy6gLA8nrrQGjxdomJmQuGxjX6BTlrRQjRecGw==";
const msg = { data: "this is test" };
const verified = verifySignature(signature, JSON.stringify(msg));
console.log(verified);
