import { TaskRow } from './TaskRow';

export const TaskTable = ({ tasks }) =>
  tasks?.length > 0 && (
    <table>
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
          />
        ))}
      </tbody>
    </table>
  );
