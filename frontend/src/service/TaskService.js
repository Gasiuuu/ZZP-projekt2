import axios from "axios";


class TaskService {

    static BASE_URL = "http://localhost:8080"

    static async createTask(taskDto) {
        const response = await axios.post(`${TaskService.BASE_URL}/adminuser/task/create`, taskDto, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    }

    static async getAllTasks() {
        const response = await axios.get(`${TaskService.BASE_URL}/adminuser/task/get-all-tasks`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    }

    static async getTaskById(id) {
        const response = await axios.get(`${TaskService.BASE_URL}/adminuser/task/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    }

    static async updateTask(id, taskDto) {
        const response = await axios.put(`${TaskService.BASE_URL}/adminuser/task/update/${id}`, taskDto, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json', // Upewnij się, że typ zawartości jest ustawiony
            },
        });
        return response.data;
    }



    static async deleteTask(id) {
        await axios.delete(`${TaskService.BASE_URL}/adminuser/task/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    }
}

export default TaskService;
