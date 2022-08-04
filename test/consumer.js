const { Kafka } = require('kafkajs')


async function main(){
    const kafka = new Kafka({
        clientId: 'my-app',
        brokers: ['192.168.0.12:9092'],
      })
    
    const consumer = kafka.consumer({ groupId: '0' })

    await consumer.connect()
    await consumer.subscribe({ topic: 'denememongo.signum.test', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        })
      },
    })
}

main()

