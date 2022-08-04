const { Kafka } = require('kafkajs')

async function main(){

    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['192.168.0.12:9092'],
      })


    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
      topic: 'denememongo.signum.test',
      messages: [
        { value: 'Hello KafkaJS user!' },
      ],
    })
    
    await producer.disconnect()
}

main()