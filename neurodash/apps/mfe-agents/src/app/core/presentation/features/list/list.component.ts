import { Component } from '@angular/core';
import { Agent } from './agent.interface';

@Component({
  selector: 'neurodash-agent-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  agents: Agent[] = [
    {
      id: '1',
      name: 'ChatBot Alpha',
      type: 'conversational',
      status: 'online',
      lastActivity: new Date(),
      tasksCompleted: 150,
      successRate: 95.5,
      averageResponseTime: 1.2,
      config: {
        maxConcurrentTasks: 10,
        timeout: 30,
        retryAttempts: 3,
        priority: 'high'
      }
    },
    {
      id: '2',
      name: 'Data Analyzer Beta',
      type: 'analytical',
      status: 'busy',
      lastActivity: new Date(),
      tasksCompleted: 89,
      successRate: 87.2,
      averageResponseTime: 5.8,
      config: {
        maxConcurrentTasks: 5,
        timeout: 60,
        retryAttempts: 2,
        priority: 'medium'
      }
    },
    {
      id: '3',
      name: 'Task Executor Gamma',
      type: 'task-executor',
      status: 'offline',
      lastActivity: new Date(),
      tasksCompleted: 234,
      successRate: 92.1,
      averageResponseTime: 3.4,
      config: {
        maxConcurrentTasks: 15,
        timeout: 45,
        retryAttempts: 4,
        priority: 'low'
      }
    }
  ];
}
