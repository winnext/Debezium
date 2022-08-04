# Kullanım

## Kafka Starter e Giriyoruz

*docker-compose.yml ın içindeki environment in altında yer alan kısımdan Ip adresi ekliyoruz (resimde beyaz çizgiyle belirtilen yer)* ![image](https://user-images.githubusercontent.com/110333072/182684740-23cb17d6-a9cf-43e4-b2e1-dc06ca14df69.png)

### Kafka Çalıştırma
![image](https://user-images.githubusercontent.com/110333072/182687016-d2903d04-a073-475b-8a0c-88cecc99dc49.png)


## Debezium ' u çalıştırmak için replicaSet oluşturulması gerekiyor.Bunun için:
**Mongo-Starter** *e giriyoruz.  docker-compose.yaml ' ın içindeki ReplicaSet ismini comand : ın yanındaki deneme yazısını değştirerek değiştirebilirsiniz(resimde beyaz çizgiyle belirtilen yer)*
![image](https://user-images.githubusercontent.com/110333072/182686787-b1786536-6cf9-4c0b-bac3-35bff8382ad9.png)

### Mongodb Çalıştırma
![image](https://user-images.githubusercontent.com/110333072/182687016-d2903d04-a073-475b-8a0c-88cecc99dc49.png)

## Commands.txt 'de de yer alan aşağıdaki komutları sırasıyla yazıyoruz

- docker container exec -it mongodb bash
- mongo
- config = {"_id":"deneme","members":[{"_id":0,"host":"192.168.0.12:27017"}]} 
>_id: -> replica set ismi(resimde gösterilen yere deneme yazısını silerek replica set ismi giriniz
![image](https://user-images.githubusercontent.com/110333072/182687571-66657260-bad8-44f3-a3bf-eb852a79482f.png)           
>members ' a replicaSet ' e eklenecek mongodb databaseleri eklenir(resimde belirtilen yer)                  
![image](https://user-images.githubusercontent.com/110333072/182800664-06595b04-153a-421a-8151-9eb92f49a04e.png)

                              

- rs.initilaze(config)

## DEBEZİUM-CONNECTOR e giriyoruz
- docker-compose.yaml ' ın içindeki envionmelt 'in altındaki BOOTSTRAP-SERVERS (resimde beyaz çizgiyle belirtilen yer) kısmına kafka URL ' si yazılır      
![image](https://user-images.githubusercontent.com/110333072/182692736-817c3745-da4f-4c77-89eb-19742adc82fd.png)

### Debezium Connect Çalıştırma
![image](https://user-images.githubusercontent.com/110333072/182696316-b731a02f-f042-47f7-a9f7-1f50be0107eb.png)


- mongodb ye debezium connector eklemek için register-mongodb.json un içindeki mongodb.host kısmına url eklenir      ![image](https://user-images.githubusercontent.com/110333072/182693220-b4ef1818-13e6-4f64-b383-08824415c2fd.png)

- mongodb.name -> (resimde gösterilen yer) kafka topiclerinin başlangıç isimlerini verir.                                                                            ![image](https://user-images.githubusercontent.com/110333072/182694300-0f52c65f-46d3-4df3-856e-8696447f0308.png)

- Debezium a post isteği atılırken register mongodb.json gönderilir
```
curl-i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:8083/connectors/ -d @register-mongodb.json
```

- Debezium a get isteği atılarak connecterler görüntülenebilir
```
curl -H "Accept:application/json" localhost:8083/connectors/
```


## Test İçin

- Test ' e girilir 
- productor.js ve consumer.js broker adresleri ayarlanır
- consumer.js çalıştırılır
- productor.js çalıştırılarak consumer e mesaj gelip gelmediği kontrol edilir
- mongo da signum databasesinde test collection una ekleme yapılır
- ekleme işlemi yapıldığında comsumer e mesaj gelecektir
