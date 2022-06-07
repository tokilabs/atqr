import * as axios from 'axios'
import { Method } from 'axios'
import { get } from 'http'


 const getChallenge = async () => {
    try {
        const res = await get('http://euduvido.com/challenge/:id')
    }catch(err) {
        console.log(err)
    }
}

getChallenge()