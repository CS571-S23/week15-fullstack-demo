```bash
docker build . -t ctnelson1997/badgerchat-basic
docker push ctnelson1997/badgerchat-basic
```

```bash
docker pull ctnelson1997/badgerchat-basic
docker run --restart=always -d -p 4040:80 --name badgerchat-basic ctnelson1997/badgerchat-basic
```