"use client"
import { DispatchType } from "@/app/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getLogs } from "./slice";
export default function SendServer() {
    const [count,setCount] = useState(1);
    const dispatch = useDispatch()

    const handleSendRequest = async () => {
        const baseUrl = 'http://127.0.0.1:3001'; 
        const path = '/api/request';
        const queryParams = new URLSearchParams({
            category: 'electronics',
        }).toString();

        const requestUrl = `${baseUrl}${path}?${queryParams}`;

        setCount(prev => prev + 1);

        try {
            const response = await fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ countLogs: count }),
            });

            if (!response.ok) {
                console.log(`сервер ответил с ошибкой: ${response.status}`);
                return
            }

            const logs = await response.json();
            !logs.length ? setCount(1) : null
            dispatch(getLogs(logs))
            

        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            alert('Ошибка при отправке запроса. Проверьте консоль.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Получить последние логи с сервера</h1>
            <p>Нажмите кнопку, чтобы отправить запрос на бэкенд и увидеть последние логи записанные в файл</p>
            <button
                onClick={handleSendRequest}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                {count > 1 ? "Получить еще" : "Получить"}
            </button>
        </div>
    )
}