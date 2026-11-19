
import { useEffect, useState } from 'react'
import './App.css'

const API_URL = '/api/tasks'
function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState(null)

  const fetchTasks = async () => {
    try {
      setError('')
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch tasks')
      const data = await response.json()
      setTasks(data.data || [])
    } catch (err) {
      setError('Cannot connect to backend. Make sure the API server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const taskData = { title, description }

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        }
      )

      if (!response.ok) throw new Error('Failed to save task')

      setTitle('')
      setDescription('')
      setEditingId(null)
      await fetchTasks()
    } catch {
      setError('Unable to save task. Please try again.')
    }
  }

  const handleEdit = (task) => {
    setTitle(task.title)
    setDescription(task.description || '')
    setEditingId(task.id)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete task')
      await fetchTasks()
    } catch {
      setError('Unable to delete task.')
    }
  }

  const updateStatus = async (task, status) => {
    try {
      const response = await fetch(`${API_URL}/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description || '',
          status,
        }),
      })
      if (!response.ok) throw new Error('Failed to update status')
      await fetchTasks()
    } catch {
      setError('Unable to update task status.')
    }
  }

  return (
    <main className="app">
      <header className="header">
        <h1>TaskFlow</h1>
        <p>Manage your tasks. Stay productive.</p>
      </header>

      <section className="task-form">
        <h2>{editingId ? 'Edit Task' : 'Create a New Task'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="form-actions">
            <button type="submit">
              {editingId ? 'Update Task' : 'Add Task'}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null)
                  setTitle('')
                  setDescription('')
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="task-section">
        <h2>Your Tasks ({tasks.length})</h2>

        {error && <p className="error">{error}</p>}
        {loading && <p>Loading tasks...</p>}

        {!loading && !error && tasks.length === 0 && (
          <p className="empty">No tasks yet. Create your first task!</p>
        )}

        <div className="task-list">
          {tasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-info">
                <h3>{task.title}</h3>
                <p>{task.description || 'No description'}</p>
                <span className={`status ${task.status}`}>
                  {task.status}
                </span>
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button onClick={() => handleEdit(task)}>Edit</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
