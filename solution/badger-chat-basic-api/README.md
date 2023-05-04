```bash
docker build . -t ctnelson1997/badgerchat-basic-api
docker push ctnelson1997/badgerchat-basic-api
```

```bash
docker pull ctnelson1997/badgerchat-basic-api
docker run -v /mydbdir:/usr/src/app/db --restart=always -d -p 30000:30000 --name badgerchat-basic-api ctnelson1997/badgerchat-basic-api
```