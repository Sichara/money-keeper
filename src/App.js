import './App.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, get, ref, child } from 'firebase/database';
import { useEffect, useState } from 'react';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    databaseURL: 'https://money-keeper-90b22-default-rtdb.firebaseio.com',
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(app));

async function getData() {
    return get(child(dbRef, '/'));
}

const getDays = (dateStart, dateFinish) => {
    const difference = dateFinish.getTime() - dateStart.getTime();

    return Math.floor(difference / (1000 * 3600 * 24));
}

const calculateAmount = (defaultAmount, numberOfDays, increment) => {
    return defaultAmount + Math.floor(numberOfDays / 7) * increment;
}

function App() {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        getData().then(res => {
            const data = res.val();
            const {amount: defaultAmount, startDate, increment = 10} = data;

            const days = getDays(new Date(startDate), new Date());

            setAmount(calculateAmount(defaultAmount, days, increment));
            console.error(data, days);
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <p>Ева,</p>
                <p>
                    у тебя {amount} шекелей
                </p>
            </header>
        </div>
    );
}

export default App;
