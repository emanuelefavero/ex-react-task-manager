import { TaskRow } from './TaskRow';
import './TaskTable.css';

export const TaskTable = ({ tasks }) =>
  tasks?.length > 0 && (
    <table className='task-table'>
      <thead>
        <tr>
          <th scope='col'>Task</th>
          <th scope='col'>Status</th>
          <th scope='col'>Created At</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
          />
        ))}
      </tbody>
    </table>
  );
