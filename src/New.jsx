

 export class CrudApiClient {


  constructor(apiKey, baseUrl = 'https://crudapi.co.uk/api/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async request(endpoint, method, data = undefined) {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type');
    const responseText = await response.text();

    if (!response.ok) {
      const errorData = contentType && contentType.includes('application/json') ? JSON.parse(responseText) : responseText;
      throw new Error(`HTTP error! Status: ${response.status} Message: ${errorData.errors ? errorData.errors[0].message : response.statusText}`);
    }

    return contentType && contentType.includes('application/json') ? JSON.parse(responseText) : responseText;
  }

  async createTask(task) {
    return await this.request('task', 'POST', [task]);
  }

  async getTasks() {
    return await this.request('task', 'GET');
  }

  async getTaskById(taskId) {
    return await this.request(`task/${taskId}`, 'GET');
  }

  async updateTask(taskId, updatedTask) {
    return await this.request(`task/${taskId}`, 'PUT', updatedTask);
  }

  async deleteTask(taskId) {
    return await this.request(`task/${taskId}`, 'DELETE');
  }
}

// Usage example
const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const client = new CrudApiClient(apiKey);

const runExample = async () => {
  try {
    // Create a new task
    const newTask = await client.createTask({ title: 'My first task', completed: false });
    console.log('New Task:', newTask);

    // Get all tasks
    const tasks = await client.getTasks();
    console.log('Tasks:', tasks);

    // Get a specific task by ID
    const taskId = newTask.items[0]._uuid;
    const task = await client.getTaskById(taskId);
    console.log('Task:', task);

    // Update a task
    const updatedTask = await client.updateTask(taskId, { completed: true });
    console.log('Updated Task:', updatedTask);

    // Delete a task
    const deletedTask = await client.deleteTask(taskId);
    console.log('Deleted Task:', deletedTask);
  } catch (error) {
    console.error('Error:', error);
  }
};

// runExample();