import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-f934d.firebaseio.com/'
})